
$(function() {

  // Users
  $('#addUserForm').on('submit', function(e) {
    e.preventDefault();
    $('#addUserButton').prop('disabled', true)
    const createData = {
      email: $(this).find('input[name=email]').val(),
      password: $(this).find('input[name=password]').val()
    }

    $.post('/admin/users/add', createData, function(result) {
      console.log('result', result);
      if (!result.error) {
        $('#addUserButton').prop('disabled', false)
        $('#addUserForm').trigger('reset');
        return noty({
          text: 'Add user successful',
          type: 'success'
        });
      }
    })
  });

});
