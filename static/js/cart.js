$(document).ready(function() {
    // گرفتن URL از hidden input
    var removeItemUrl = $('#remove-item-url').val();
    var updateQuantityUrl = $('#update-quantity-url').val();
    var discountCodeUrl = $('#discount-code-url').val();
    var csrfToken = $('#csrf-token').val();

    function updateCartUI(data) {
        $('.summary-subtotal-price, .summary-total-price').text(data.total_price + " تومان");

        if ($('#cart-length').val() <= 0) {
            $('.reload-cart').html('<tr><td colspan="6" class="text-center">سبد خرید خالی است.</td></tr>');
            $('.btn-checkout').addClass('disabled');
        }
    }

    $('.product-remove').click(function(e) {
        e.preventDefault();
        var button = $(this);
        var productId = button.data('product-id');

        $.ajax({
            url: removeItemUrl,  // استفاده از URL درست برای حذف آیتم
            method: 'POST',
            data: {
                'item_id': productId,
                'csrfmiddlewaretoken': csrfToken
            },
            success: function(data) {
                if (data.success) {
                    button.closest('tr').remove();
                    updateCartUI(data);
                } else {
                    alert(data.message || 'خطا در حذف محصول.');
                }
            },
            error: function(xhr, status, error) {
                console.log('AJAX Error:', error);
                alert('مشکلی در ارتباط با سرور وجود دارد.');
            }
        });
    });

    $('.quantity-minus, .quantity-plus').click(function(e) {
        e.preventDefault();
        var button = $(this);
        var productId = button.closest('.quantity-box').find('.quantity-plus, .quantity-minus').data('product-id');
        var action = button.hasClass('quantity-plus') ? 'add' : 'decrease';

        $.ajax({
            url: updateQuantityUrl,  // استفاده از URL درست برای بروزرسانی مقدار
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': csrfToken,
                'action': action,
                'item_id': productId
            },
            success: function(data) {
                var quantityInput = button.closest('.quantity-box').find('input');
                quantityInput.val(data.quantity);
                updateCartUI(data);
                if (data.quantity === 0) button.closest('tr').remove();
            },
            error: function(xhr, status, error) {
                console.log('AJAX Error:', error);
                alert('مشکلی در ارتباط با سرور وجود دارد.');
            }
        });
    });

    $('.my-discount-form').submit(function(e){
        e.preventDefault();
        var MyForm = $(this)
        var MyData = MyForm.serialize()
        var Order_total = $('.final-price').data('final-price')

        MyData += '&order_total='+Order_total;

        $.ajax({
            url: discountCodeUrl,  // استفاده از URL درست برای کد تخفیف
            data: MyData,
            method: 'POST',
            success: function (data) {
                console.log(data)
                if (data.success) {
                    var TotalPrice = data.total32
                    var apply = 'کد با موفقیت اعمال شد'
                    $('.final-price').text(TotalPrice);
                    $('.btn-discount').text(apply)
                } else {
                    var accepted = 'کد تخفیف منقضی شده است'
                    $('.btn-discount').text(accepted)
                }
            },
            error: function (error) {
                console.log(error)
            },
        });
    });
});
