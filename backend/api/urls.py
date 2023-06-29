from django.urls import path
from .views import SaveUploadedVideo, Compare
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("upload/", SaveUploadedVideo.as_view()),
    path("compare/",Compare.as_view() )
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)