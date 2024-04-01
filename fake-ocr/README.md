<p align="center">
  <a href="https://expressjs.com/" target="blank" style="font-size: 50px;">
    Express.js
  </a>  
</p>

## توضیحات

[نود جی اس](https://nodejs.org/en/download) را بر روی سیستم خود نصب داشته باشید

## نصب پکیج های مورد نیاز

داخل پوشه fake-ocr دستور زیر را در ترمینال وارد کنید.

```bash
# install package nodejs
$ cd ./fake-ocr
$ npm install
```

## راه اندازی سرور

```bash
# start server nodejs
$ npm test
```

## دستورعمل

در این پروژه با ارسال یک درخواست با متد POST به روت اصلی با خروجی زیر مواجه می شوید. \
دقت داشته باشید که Content-Type را برابر multipart/form-data قرار داده باشید.\
کافیست خروجی دلخواه را تایپ و سپس enter را بزنید.\
دقت کنید فرمت تایپ به صورت زیر باشد.

<img src="https://karnameh.com/blog/wp-content/uploads/2023/10/photo_2023-10-19_11-59-14.jpg?_t=1697704374" height="150" width="150" alt="Nest Logo"/>

```text
enter pelak
$ enter pelak: NN-W-NNN-NN
```

```JSON
[
  {
    "pelak" : "NN-W-NNN-NN",
    "type" : "truck"
  }
]
```

```txt
enter pelak
$ enter pelak: NN-W-NNN-NN#NN-W-NNN-NN
```

```JSON
[
  {
    "pelak" : "NN-W-NNN-NN",
    "type" : "truck"
  },
  {
    "pelak" : "NN-W-NNN-NN",
    "type" : "truck"
  }
]
```

```txt
enter pelak
$ enter pelak: ۱۲-ث-۳۶۵-۱۱ 
```

```JSON
[
  {
    "pelak" : "۱۲-ث-۳۶۵-۱۱",
    "type" : "truck"
  }
]
```

تایپ بازگردانده به صورت زیر می باشد.

```typescript
typeof return
{
  pelak: string;
  type: "truck" | "car" | "motor" | "bus" | null;
}
```

## Developer

Hossein faraj zade jalali
<div style="display: flex; flex-wrap: wrap;">
  <p style="display: flex; flex-direction: column; width: fit-content; align-items: center;  margin: 0 13px 0 13px;">
    <img src="https://avatars.githubusercontent.com/u/103479589" height="50" width="50" alt="Nest Logo" style="border-radius: 900px;"/>
    <a href="https://github.com/Kofri">Github</a>
  </p>
  <p style="display: flex; flex-direction: column; width: fit-content; align-items: center;  margin: 0 13px 0 13px;">
    <img src="https://avatars.githubusercontent.com/u/149144798" height="50" width="50" alt="Nest Logo" style="border-radius: 900px;"/>
    <a href="https://github.com/hachalick">Github</a>
  </p>
</div>