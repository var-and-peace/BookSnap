def detect_text_b64(b64_string):
    """Detects text in the file."""
    from google.cloud import vision
    import io
    import os
    import base64
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/cmoon/Downloads/booksnap-292516-753adb551121.json"

    client = vision.ImageAnnotatorClient()

    image = base64.b64decode(b64_string)
    image = vision.Image(content=image)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


def detect_text_bytes(imgBytes):
    """Detects text in the file."""
    from google.cloud import vision
    import io
    import os
    import base64
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./booksnap-service_account.json"

    client = vision.ImageAnnotatorClient()

    image = vision.Image(content=imgBytes)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    textDetected = []

    for text in texts:
        textDetected.append(text.description)
    return textDetected

    # if response.error.message:
    #     raise Exception(
    #         '{}\nFor more info on error messages, check: '
    #         'https://cloud.google.com/apis/design/errors'.format(
    #             response.error.message))
