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

**Return**:

```json
{
    "message": "otp sended"
}
```

**Description**:\
*when everything is ok and the code is sent*\
\
**Statues code**: 201

***

## Error

**Return**:

```json
{ 
    "statusCode": "429",
    "message": "otp not yet expires"
}
```

**Description**:\
*when the code generation has not expired*\
\
**Statues code**: 429

***

**Return**:

```json
{ 
    "statusCode": "400",
    "message": "mobile not existed"
}
```

**Description**:\
*when there is no mobile field in the body*\
\
**Statues code**: 400
