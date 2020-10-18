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


def localize_objects(path):
    """Localize objects in the local image.

    Args:
    path: The path to the local file.
    """
    from google.cloud import vision
    import os
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./booksnap-service_account.json"

    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    objects = client.object_localization(
        image=image).localized_object_annotations

    print('Number of objects found: {}'.format(len(objects)))
    for object_ in objects:
        print('\n{} (confidence: {})'.format(object_.name, object_.score))
        print('Normalized bounding polygon vertices: ')
        for vertex in object_.bounding_poly.normalized_vertices:
            print(' - ({}, {})'.format(vertex.x, vertex.y))


def detect_text_path(path):
    """Detects text in the file."""
    from google.cloud import vision
    import io
    import os
    import base64
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./booksnap-service_account.json"

    client = vision.ImageAnnotatorClient()
    with open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts[1:]:
        print('\n"{}"'.format(text.description))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


# detect_text_path('/Users/cmoon/Downloads/IMG_4329.HEIC')
