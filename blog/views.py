from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from blog.models import BlogPost
from blog.forms import BlogCommentForm
from store.models import Category

def blog_detail(request, blog_id):
    post = get_object_or_404(BlogPost, id=blog_id)
    return render(request, 'blog/detail.html', {'post': post, 'blogs': BlogPost.objects.all().order_by('-created_at'), 'categories': Category.objects.filter(parent__isnull=True)})


@login_required
def add_comment(request, blog_id):
    post = get_object_or_404(BlogPost, id=blog_id)
    if request.method == "POST":
        form = BlogCommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.user = request.user  # ذخیره کاربر لاگین شده
            comment.save()
            return redirect('blog:blog_detail', blog_id=post.id)
    else:
        form = BlogCommentForm()
    return render(request, 'blog.html', {'form': form, 'post': post})
