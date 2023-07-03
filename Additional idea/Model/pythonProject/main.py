import tensorflow.keras as keras
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras import regularizers
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import h5py
import matplotlib.pyplot as plt

# Data generators
train_datagen = keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)
test_datagen = keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    'Food dataset/train/',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Load test images from h5 file
test_file = h5py.File('path/to/test/file.h5', 'r')
test_images = test_file['images']
test_labels = test_file['labels']

# Convert test images to NumPy array and normalize
test_images = test_images[:]
test_images = test_images.astype('float32') / 255.0

# Reshape test images if necessary
# test_images = test_images.reshape(...)

# Define the number of test samples
num_test_samples = test_images.shape[0]

# Create test generator from the loaded test images
test_generator = test_datagen.flow(
    test_images,
    test_labels,
    batch_size=32,
    shuffle=False
)

# Load pre-trained model
base_model = InceptionV3(weights='imagenet', include_top=False)

# Add custom layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu', kernel_regularizer=regularizers.l2(0.01))(x)
x = Dense(512, activation='relu', kernel_regularizer=regularizers.l2(0.01))(x)
x = Dense(256, activation='relu', kernel_regularizer=regularizers.l2(0.01))(x)
predictions = Dense(20, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# Fine-tune pre-trained layers
for layer in model.layers[:249]:
    layer.trainable = False
for layer in model.layers[249:]:
    layer.trainable = True

# Adjust learning rate
adam = Adam(learning_rate=0.0001)

# Compile model
model.compile(optimizer=adam, loss='categorical_crossentropy', metrics=['accuracy'])

# Define callbacks
early_stopping = EarlyStopping(monitor='val_loss', patience=5)
model_checkpoint = ModelCheckpoint('best_model.h5', monitor='val_accuracy', save_best_only=True)

# Train model
history = model.fit(
    train_generator,
    epochs=2,
    validation_data=test_generator,
    steps_per_epoch=len(train_generator),
    validation_steps=num_test_samples // 32,
    callbacks=[early_stopping, model_checkpoint]
)

# Print accuracy
print('Final training accuracy:', history.history['accuracy'][-1])
print('Final validation accuracy:', history.history['val_accuracy'][-1])

# Save model
model.save('my_model2_two_inception3withbigaugmentation.h5')

# Plot training and validation accuracy
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(len(acc))

plt.figure(figsize=(12, 8))
plt.subplot(2, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
if val_acc is not None:
    plt.plot(epochs_range, val_acc, label='Validation Accuracy')
    plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(2, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, loss, label='Training Loss')
if val_loss is not None:
    plt.plot(epochs_range, val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
