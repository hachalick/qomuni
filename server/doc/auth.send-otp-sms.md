# Base sub route

> ***/auth***

## Route

> ***/send-otp-sms***

**Method**: POST\
**Header**: Default\
**Body**:

```json
{
    "mobile": "9XXXXXXXXX"
}
```

***

## Accept

**Description**:\
*when everything is ok and the code is sent*\
\
**Statues code**: 201\
\
**Return**:

```json
{
    "message": "otp sended"
}
```

***

## Error

**Description**:\
*when the code generation has not expired*\
\
**Statues code**: 429\
\
**Return**:

```json
{ 
    "statusCode": "429",
    "message": "otp not yet expires"
}
```

***

**Description**:\
*when there is no mobile field in the body*\
\
**Statues code**: 400\
\
**Return**:

```json
{ 
    "statusCode": "400",
    "message": "mobile not existed"
}
```
