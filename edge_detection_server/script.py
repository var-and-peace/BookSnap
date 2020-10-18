# note: you need to pip install the following to import these modules.
# pip install opencv-python imageio numpy
import base64
import io
import cv2
from imageio import imread
import numpy as np
import google_vision
import itertools
from collections import OrderedDict


# read the stdin from the express server
b64_string = input()

# decode base64 -> bytes -> BGR numpy array -> RGB numpy array
img = imread(io.BytesIO(base64.b64decode(b64_string)))
img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

# image processing
p_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
p_img = cv2.medianBlur(p_img, 5)
p_img = cv2.Canny(p_img, 100, 150, apertureSize=3)
height = img.shape[0]
width = img.shape[1]

# edge detection
lines = cv2.HoughLines(p_img, 1, np.pi/180, 240)
if (not lines):
    print('No lines found!')
    quit()
filtered_lines = []
for line in lines:
    rho, theta = line[0]
    # filter for vertical lines
    if not ((0 <= theta < 0.25) or (np.pi - 0.25 < theta <= np.pi)):
        continue
    filtered_lines.append((rho, theta))

# sort by rho
filtered_lines.sort(key=lambda x: abs(x[0]))
if (len(filtered_lines) == 0):
    print('No lines found post-filter!')
    quit()

# batch close lines together
batches = [[]]
MIN_LENGTH = int(.0125*width)
for i in range(len(filtered_lines)):
    rho1, theta1 = filtered_lines[i]
    rho0, theta0 = filtered_lines[i - 1]

    if (abs(rho1) - abs(rho0)) < MIN_LENGTH:
        batches[-1].append((rho1, theta1))
    else:
        batches.append([(rho1, theta1)])

# take the average of close batches
filtered_lines = [batch[len(batch)//2] for batch in batches]

# convert filtered lines into tuple of coordinate points
for i in range(len(filtered_lines)):
    rho, theta = filtered_lines[i]
    a = np.cos(theta)
    b = np.sin(theta)

    x1 = rho/np.cos(theta)
    x2 = x1 - height*np.tan(theta)
    x1, x2 = int(x1), int(x2)
    cv2.line(img, (x1, 0), (x2, height), (0, 0, 200), 3)
    filtered_lines[i] = [x1, x2]

cv2.imshow('show image', img)

# edge cases - left and right border of image
filtered_lines.append([width, width])
filtered_lines.insert(0, [0, 0])

# crop along detected edges and apply text detection
textDetected = []
scale_percent = 100  # crop scale percent
for i in range(0, len(filtered_lines) - 1):
    b1, b2 = filtered_lines[i + 1]
    a1, a2 = filtered_lines[i]

    a, b = max(0, min(a1, a2)), min(width, max(b1, b2))
    rect = np.copy(img[0: height, a: b])
    for y in range(height):
        x = int(b1 - (b1 - b2)*y/height)
        rect[y, x - a: b - a] = [0, 200, 0]
    for y in range(height):
        x = int(a1 - (a1 - a2)*y/height)
        rect[y, 0: x - a] = [0, 200, 0]

    new_width = int(rect.shape[1] * scale_percent / 100)
    new_height = int(rect.shape[0] * scale_percent / 100)
    dim = (new_width, new_height)
    rect = cv2.resize(rect, dim)

    text = google_vision.detect_text_bytes(
        cv2.imencode('.jpeg', rect)[1].tobytes())
    textDetected.append([s.split('\n') for s in text])

# format results into strings with no repeats
for i in range(len(textDetected)):
    text = list(itertools.chain.from_iterable(textDetected[i]))
    text = ' '.join(text).split()
    text = ' '.join(list(OrderedDict.fromkeys(text)))
    textDetected[i] = text

# send an array of detected text strings to express server
print(textDetected)

# scale_percent = 30
# new_width = int(width * scale_percent / 100)
# new_height = int(height * scale_percent / 100)
# dim = (new_width, new_height)
# img = cv2.resize(img, dim)
# cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
