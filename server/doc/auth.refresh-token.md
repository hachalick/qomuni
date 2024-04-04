# Base sub route

> ***/auth***

## Route

> ***/refresh-token***

**Method**: PUT\
**Header**: Default\
**Body**:

```json
{
    "refresh_token": "TOKEN",
}
```

***

## Accept

**Return**:

```json
{
    "message": "refresh token created successfully",
    "access_token": "TOKEN",
    "refresh_token": "TOKEN"
}
```

**Description**:\
*when everything is ok and token created*\
\
**Statues code**: 200

***

## Error

**Return**:

```json
{ 
    "statusCode": "404",
    "message": "refresh_token not existed"
}
```

**Description**:\
*when filed refresh_token is not exist in body*\
\
**Statues code**: 404

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

***

**Return**:

```json
{ 
    "statusCode": "406",
    "message": "token is expired"
}
```

**Description**:\
*when refresh_token is expired and should sign in try again*\
\
**Statues code**: 406
