import argparse
import cv2

parser = argparse.ArgumentParser()
parser.add_argument('--url', type=str, help="url to connect")
parser.add_argument('--id', type=str, help="protocol number")
args = parser.parse_args()

url = args.url
id = args.id

cap = cv2.VideoCapture(url)
ret, frame = cap.read()
cv2.imwrite("./public/images/image.jpg", frame)
if cv2.waitKey(1) & 0xFF == 27:
    print("none")
cap.release()
print("ok")

cv2.destroyAllWindows()