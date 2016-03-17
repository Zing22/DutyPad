$(document).ready(function() {

	$('.ui.form').form({
		fields: {
			email: {
				identifier: 'email',
				rules: [{
					type: 'empty',
					prompt: 'Please enter your e-mail'
				}, {
					type: 'email',
					prompt: 'Please enter a valid e-mail'
				}]
			},
			password: {
				identifier: 'password',
				rules: [{
					type: 'empty',
					prompt: 'Please enter your password'
				}, {
					type: 'length[6]',
					prompt: 'Your password must be at least 6 characters'
				}]
			}
		}
	});

	$('div.ui.tabular.menu > a.item').click(function() {
		var menu = $(this).parent('.menu');
		menu.children('a.item.active').removeClass('active');
		$(this).addClass('active');
	})

	$("#newDutyModal").modal({
			blurring: true,
			onApprove: function() {
				window.alert('Approved!');
			}
		})
		.modal('setting', 'transition', 'horizontal flip');
	$("#setBeginDayModal").modal({
			blurring: true
		})
		.modal('setting', 'transition', 'horizontal flip');

	$('.ui.labeled.icon.sidebar')
		.not('.styled')
		.sidebar('setting', {
			dimPage: true,
			transition: 'overlay',
			mobileTransition: 'overlay'
		});

	$('#my-progress')
		.progress({
			label: 'ratio',
			text: {
				ratio: '{value} / {total}'
			}
		});
});