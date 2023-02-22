$('#payout-form').submit(function (e) {
	e.preventDefault();
	const fd = {
		amount: $('#payout-amount-input').val().replace(/,/g, '')
	};
	$.ajax({
		url: '/wallet/payout/request',
		data: JSON.stringify(fd),
		processData: false,
		contentType: 'application/json; charset=utf-8',
		type: 'POST',
		success: function(data, textStatus, xhr){
			$.notify('Payout Request Submitted', {position: 'top center' , className : 'success'});
		},
		error: function(data, textStatus, xhr){
			$.notify(`Error : ${data.responseText}`, {position: 'top center' , className : 'error'});
		}
	});
});

$('#payout-amount-input').keyup(function(event) {

	// skip for arrow keys
	if(event.which >= 37 && event.which <= 40) return;
  
	// format number
	$(this).val(function(index, value) {
		return value
			.replace(/\D/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		;
	});
});