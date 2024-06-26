# Base sub route

> ***/auth***

## Route

> ***/forgot-token-tel***

**Method**: PUT\
**Header**: Default\
**Body**:

```json
{
    "mobile": "9XXXXXXXXX",
    "otp": "XXXXXX",
}
```

>[!WARNING]
>
> - Mobile must be without the first zero.
> - The code is equal to 6 digits.

***

## Accept

**Return**:

```json
{
    "message": "auth is successfully",
    "token_telegram": "TOKEN",
}
```

**Description**:\
*when everything is ok and the token telegram sended*\
\
**Statues code**: 200

***

## Error

**Return**:

```json
{ 
    "statusCode": "404",
    "message": "mobile not existed"
}
```

**Description**:\
*when filed mobile is not exist in body*\
\
**Statues code**: 404

***

**Return**:

```json
{ 
    "statusCode": "404",
    "message": "otp not exists"
}
```

**Description**:\
*when filed otp is not exist in body*\
\
**Statues code**: 404

***

**Return**:

```json
{ 
    "statusCode": "400",
    "message": "otp used"
}
```

**Description**:\
*when otp has been used and should get otp try again*\
\
**Statues code**: 400

***

**Return**:

```json
{ 
    "statusCode": "504",
    "message": "otp expired"
}
```

**Description**:\
*when otp has been expired and should get otp try again*\
\
**Statues code**: 504

***

**Return**:

```json
{ 
    "statusCode": "400",
    "message": "otp not correct"
}
```

**Description**:\
*when otp is not correct and should get otp try again*\
\
**Statues code**: 400

***

**Return**:

```json
{ 
    "statusCode": "409",
    "message": "user is not existed"
}
```

**Description**:\
*when user is not existed and should be sign in*\
\
**Statues code**: 409
