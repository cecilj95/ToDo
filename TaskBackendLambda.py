import json
import boto3


rds_client = boto3.client('rds-data')
database_name = 'ipdatabase'
db_cluster_arn = 'arn:aws:rds:us-east-2:026802451096:cluster:internshipprojectcluster'
db_credentials_secrets_store_arn = 'arn:aws:secretsmanager:us-east-2:026802451096:secret:rds-db-credentials/cluster-UFR65HZXVBFQXE2RXVEUBI3UP4/admin/1666216261131-tOj4Oz'


def lambda_handler(event, context):
    # TODO implement
    
    path = event['path']
    httpmethod=event['httpMethod']
    user_id=event['queryStringParameters']['user_id']
    
    if path=='/getalltasks' :
        response = execute_statement('SELECT * FROM ipdatabase.tasks where user_id='+str(user_id))
    
    if path=='/tasks' and httpmethod=='POST':
        task_title=event['queryStringParameters']['title']
        task_description=event['queryStringParameters']['description']
        querystring = 'insert into tasks (user_id,task_title,task_description,task_status,task_date) values ("%s","%s","%s","active",now())'%(user_id,task_title,task_description)
        response = execute_statement(querystring)
        
    if path=='/tasks/update' and httpmethod=='PATCH':
        task_title=event['queryStringParameters']['title']
        task_description=event['queryStringParameters']['description']
        querystring = 'insert into tasks (user_id,task_title,task_description,task_status,task_date) values ("%s","%s","%s","active",now())'%(user_id,task_title,task_description)

    return response;
    
def execute_statement(sql):
    response = rds_client.execute_statement(
        secretArn=db_credentials_secrets_store_arn,
        database=database_name,
        resourceArn=db_cluster_arn,
        sql=sql
    )
    return response;
            
            
            
    
    return {
        'statusCode': 200,
        'body': 'Hello from Lambda'
    }
