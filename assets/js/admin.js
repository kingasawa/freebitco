
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

  $('#editUserForm').on('submit', function(e) {
    e.preventDefault();
    $('#editUserButton').prop('disabled', true)
    const id = $(this).find('input[name=id]').val()
    const updateData = {
      lottery_ticket: $(this).find('input[name=lottery_ticket]').val(),
      reward_point: $(this).find('input[name=reward_point]').val(),
      current_coin: $(this).find('input[name=current_coin]').val(),
      human: $('input[name=human]').is(':checked')
    }

    console.log('updateData', updateData);
    $.post(`/admin/users/edit/${id}`, updateData, function(result) {
      console.log('result', result);
      if (!result.error) {
        $('#editUserButton').prop('disabled', false)
        // $('#addUserForm').trigger('reset');
        return noty({
          text: 'Update user successful',
          type: 'success'
        });
      }
    })
  });

});
