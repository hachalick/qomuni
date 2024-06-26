# Base sub route

> ***/auth***

## Route

> ***/sign-up***

**Method**: POST\
**Header**: Default\
**Body**:

```json
{
    "mobile": "9XXXXXXXXX",
    "otp": "NNNNNN",
    "password": "abcde",
}
```

>[!WARNING]
>
> - Mobile must be without the first zero.
> - Password must be at least 5 characters long.
> - The code is equal to 6 digits.

***

## Accept

**Return**:

```json
{
    "message": "created account successfully",
    "token_telegram": "TOKEN",
    "access_token": "TOKEN",
    "refresh_token": "TOKEN"
}
```

**Description**:\
*when everything is ok and the user account created*\
\
**Statues code**: 201

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
    "message": "user is existed"
}
```

**Description**:\
*when user is existed and should be sign in*\
\
**Statues code**: 409
