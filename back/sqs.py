import json

import boto3


class SQS:
    def __init__(
        self
    ):

        self._sqs_client = None
        self._queue_url = "customer-sku-sub-queue"
        self._region = "ap-southeast-2"
        self._end_point = "https://sqs.ap-southeast-2.amazonaws.com"

    def connect(self):
        session = boto3.Session()
        self._sqs_client = session.client(
            service_name="sqs", endpoint_url=self._end_point, region_name=self._region
        )

    def send_message(self, msg_body):
        self._sqs_client.send_message(
            QueueUrl=self._queue_url,
            MessageBody=json.dumps(msg_body),
        )