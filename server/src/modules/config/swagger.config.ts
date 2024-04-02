import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('کنترل ماشین')
  .setDescription(
    'پروژه نهایی دانشگاه قم در مقطع کارشناسی توسط حسین فرج زاده جلالی و شبنم جلیل پور زده شده و قصد آن کنترل ورود و خروجی وسایل نقلی است که پلاک دارند',
  )
  .setVersion('0.0.1')
  .build();
