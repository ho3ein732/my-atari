$(document).ready(function () {
    // گرفتن URLها و csrf token از hidden input
    var addToCartUrl = $('#add-to-cart-url').val();
    var removeItemUrl = $('#remove-item-url').val();
    var addToFavoriteUrl = $('#add-to-favorite-url').val();
    var removeFavoriteUrl = $('#remove-favorite-url').val();
    var csrfToken = $('#csrf-token').val();

    // اضافه کردن محصول به سبد خرید
    $('.btn-cart').click(function (e) {
        e.preventDefault();
        var button = $(this);
        var productId = button.data('product-id');

        $.ajax({
            type: 'POST',
            url: addToCartUrl.replace('0', productId),  // استفاده از URL برای اضافه کردن به سبد خرید
            data: {
                'csrfmiddlewaretoken': csrfToken
            },
            success: function (data) {
                $('.reload').load(location.href + " .reload");
                $('.my-item-count').text(data.item_count);
            },
            error: function (xhr) {
                var response = JSON.parse(xhr.responseText);
                console.log(response.error || "خطایی رخ داده است.");
            }
        });
    });

    // حذف آیتم از سبد خرید
    $(document).on('click', '.remove_item', function (e) {
        e.preventDefault();
        var button = $(this);
        var productId = button.data('product-id');

        $.ajax({
            type: 'POST',
            url: removeItemUrl,  // استفاده از URL برای حذف آیتم از سبد خرید
            data: {
                'csrfmiddlewaretoken': csrfToken,
                'item_id': productId
            },
            success: function (data) {
                if (data.success) {
                    button.closest('.product').remove();
                    $('.price-total-1').text(data.total_price);
                    $('.my-price').text(data.total_price);
                    $('.my-item-count').text(data.item_count);

                    if (data.item_count === 0) {
                        $('.reload').html('<p>سبد خرید شما خالی است</p>');
                    }
                } else {
                    console.log(data.error || "خطایی رخ داده است.");
                }
            },
            error: function (xhr) {
                console.log("خطایی رخ داده است." + xhr);
            }
        });
    });

    // افزودن به علاقه‌مندی‌ها
    $('.btn-wishlist').click(function (event) {
        event.preventDefault();
        var button = $(this);
        var productId = button.data('product-id');

        $.ajax({
            url: addToFavoriteUrl.replace('0', productId),  // استفاده از URL برای افزودن به علاقه‌مندی‌ها
            method: 'POST',
            data: {
                'csrfmiddlewaretoken': csrfToken
            },
            success: function (data) {
                $('.my-wishlist-heart').text(data.favorite_count);

                if (data.saved) {
                    $('#wishlist-message-dell').hide();
                    $('#wishlist-message').fadeIn().delay(3000).fadeOut();
                } else {
                    $('#wishlist-message').hide();
                    $('#wishlist-message-dell').fadeIn().delay(3000).fadeOut();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    // حذف از علاقه‌مندی‌ها
    $('#remove-will').click(function() {
        var button = $(this);
        var productId = button.data('product-id');

        $.ajax({
            method: 'POST',
            url: removeFavoriteUrl.replace('0', productId),  // استفاده از URL برای حذف از علاقه‌مندی‌ها
            data: {
                'csrfmiddlewaretoken': csrfToken
            },
            success: function (response) {
                if (response.success) {
                    button.closest('tr').remove();
                } else {
                    console.log('مشکلی در حذف');
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
