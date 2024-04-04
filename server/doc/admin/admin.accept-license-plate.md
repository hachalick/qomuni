# Base sub route

> ***/admin***

## Route

> ***/accept-license-plate***

**Method**: POST\
**Header**:

```json
{
    "access_token": "Bearer token",
    ...default
}
```

***

## Accept

**Return**:

```json
[
    {
        "user_license_plates_id": "8669ac20-b946-4b15-9e5f-62aed9d343e2",
        "license_plate": "NN-W-NNN-NN",
        "isAccept": true,
    },
    {
        "user_license_plates_id": "8669ac20-b946-4b15-9e5f-62aed9d343e1",
        "license_plate": "NN-W-NNN-NN",
        "isAccept": false
    },
    ...
]
```

**Description**:\
*when everything is ok and access license plate of user returned*\
\
**Statues code**: 200

***

## Error

**Return**:

```json
{ 
    "statusCode": "424",
    "message": "token not recognized"
}
```

**Description**:\
*when the token was not recognized as correctly role*\
\
**Statues code**: 424

***

**Return**:

```json
{ 
    "statusCode": "404",
    "message": "access_token not existed"
}
```

**Description**:\
*when filed access_token was not existed in headers*\
\
**Statues code**: 404

***

**Return**:

```json
{ 
    "statusCode": "400",
    "message": "Bearer not existed"
}
```

**Description**:\
*when format access_token was not correctly set*\
\
**Statues code**: 400

***

**Return**:

```json
{ 
    "statusCode": "400",
    "message": "token not existed"
}
```

**Description**:\
*when format access_token was not correctly set*\
\
**Statues code**: 400

***

**Return**:

```json
{ 
    "statusCode": "504",
    "message": "token expires"
}
```

**Description**:\
*when format access_token was not correctly set*\
\
**Statues code**: 504

***

**Return**:

```json
{ 
    "statusCode": "406",
    "message": "token is broken"
}
```

**Description**:\
*when refresh_token is broken*\
\
**Statues code**: 406
