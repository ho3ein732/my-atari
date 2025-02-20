# Generated by Django 5.1.6 on 2025-02-19 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_review_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='copen',
            options={'verbose_name': 'کوپن', 'verbose_name_plural': 'کوپن ها'},
        ),
        migrations.AlterModelOptions(
            name='emails',
            options={'verbose_name': 'ایمیل', 'verbose_name_plural': 'ایمیل ها'},
        ),
        migrations.AlterModelOptions(
            name='sliderproduct',
            options={'verbose_name': 'اسلایدر محصول', 'verbose_name_plural': 'اسلایدر های محصولات'},
        ),
        migrations.AlterModelOptions(
            name='usercopenusage',
            options={'verbose_name': 'کاربر استفاده کرده از کوپن', 'verbose_name_plural': 'کاربران استفاده کرده از کوپن'},
        ),
        migrations.AlterField(
            model_name='banner',
            name='position',
            field=models.CharField(choices=[('top', 'بالا')], default='top', max_length=25, verbose_name='مکان بنر'),
        ),
        migrations.AlterField(
            model_name='sliderproduct',
            name='location',
            field=models.CharField(choices=[('top', 'بالا'), ('middle', 'وسط')], default='button', max_length=20),
        ),
    ]
