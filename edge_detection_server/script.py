import base64
import io
import cv2
from imageio import imread
import numpy as np

b64_string = input()
img = imread(io.BytesIO(base64.b64decode(b64_string)))


p_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
p_img = cv2.medianBlur(p_img, 5)
p_img = cv2.Canny(p_img, 100, 150, apertureSize=3)


lines = cv2.HoughLines(p_img, 1, np.pi/180, 150)
filtered_lines = []
for line in lines:
    rho, theta = line[0]
    if not ((0 <= theta < 0.25) or (np.pi - 0.25 < theta <= np.pi)):
        continue
    filtered_lines.append((rho, theta))

# sort by rho
filtered_lines.sort()

# # batching
# # batch close lines together
# # take the average distance of the lines
# batches = [[]]
# MIN_LENGTH = 100/2
# for i in range(len(filtered_lines)):
#     rho1, theta1 = filtered_lines[i]
#     rho0, theta0 = filtered_lines[i - 1]

#     if (rho1 - rho0) < MIN_LENGTH:
#         batches[-1].append((rho1, theta1))
#     else:
#         batches.append([(rho1, theta1)])

# # batch processing
# filtered_lines = [batch[len(batch)//2] for batch in batches]


for rho, theta in filtered_lines:

    a = np.cos(theta)
    b = np.sin(theta)
    x0 = a*rho
    y0 = b*rho
    x1 = rho/np.cos(theta)
    x2 = x1 - img.shape[0]*np.tan(theta)
    y1, y2 = 0, img.shape[0]
    x1, x2 = int(x1), int(x2)

    cv2.line(img, (x1, y1), (x2, y2), (154, 205, 50), 3)


dsize = (3000, 2000)
img = cv2.resize(img, dsize)
cv2.imshow('houghlines3.jpg', img)

cv2.waitKey(0)
cv2.destroyAllWindows()
