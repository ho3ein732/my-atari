# Generated by Django 5.1.6 on 2025-02-19 15:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='review',
            options={'ordering': ['-created_at'], 'verbose_name': 'کاربر', 'verbose_name_plural': 'کاربران'},
        ),
    ]
