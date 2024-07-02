# Generated by Django 5.0.6 on 2024-07-02 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consulta', '0002_alter_servicio_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicio',
            name='disponibilidad',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='servicio',
            name='duracion',
            field=models.IntegerField(help_text='Duración en minutos'),
        ),
        migrations.AlterField(
            model_name='servicio',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='servicio',
            name='requisitos',
            field=models.BooleanField(default=False),
        ),
    ]
