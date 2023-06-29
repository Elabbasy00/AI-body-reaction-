from django.contrib import admin
from .models import *
# Register your models here.
 
@admin.register(PoseVideo)
class PostVideoAdmin(admin.ModelAdmin):
    pass