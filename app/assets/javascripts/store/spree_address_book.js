//= require store/spree_core

(function($) {
  $(document).ready(function(){
    if($('#checkout_form_address').is('*') || $('form').is('.edit_address')){
      var get_states = function(region){
          country = $('p#' + region + 'country' + ' span#' + region + 'country-selection :only-child').val();
          return state_mapper[country];
        }

        var update_state = function(region) {
          states = get_states(region);

          state_select = $('p#' + region + 'state select');
          state_input = $('p#' + region + 'state input');

          if(states) {
            selected = state_select.val();
            state_select.html('');
            states_with_blank = [["",""]].concat(states);
            $.each(states_with_blank, function(pos,id_nm) {
              var opt = $(document.createElement('option'))
                        .attr('value', id_nm[0])
                        .html(id_nm[1]);
              if(selected==id_nm[0]){
                opt.prop("selected", true);
              }
              state_select.append(opt);
            });
            state_select.prop("disabled", false).show();
            state_input.hide().prop("disabled", true);

          } else {
            state_input.prop("disabled", false).show();
            state_select.hide().prop("disabled", true);
          }

        };

        $('p#bcountry select').change(function() { update_state('b'); });
        $('p#scountry select').change(function() { update_state('s'); });
        update_state('b');
        update_state('s');

      if ($(".select_address").length) {
        $('input#order_use_billing').unbind("click");
        $(".inner").hide();
        $(".inner input").prop("disabled", true);
        $(".inner select").prop("disabled", true);
        if ($('input#order_use_billing').is(':checked')) {
          $("#shipping .select_address").hide();
        }
        
        $('input#order_use_billing').click(function() {
          if ($(this).is(':checked')) {
            $("#shipping .select_address").hide();
            hide_address_form('shipping');
          } else {
            $("#shipping .select_address").show();
            if ($("input[name='order[ship_address_id]']:checked").val() == '0') {
              show_address_form('shipping');
            }
          }
        });

        $("input[name='order[bill_address_id]']:radio").change(function(){
          if ($("input[name='order[bill_address_id]']:checked").val() == '0') {
            show_address_form('billing');
          } else {
            hide_address_form('billing');
          }
        });

        $("input[name='order[ship_address_id]']:radio").change(function(){
          if ($("input[name='order[ship_address_id]']:checked").val() == '0') {
            show_address_form('shipping');
          } else {
            hide_address_form('shipping');
          }
        });
      }
    }
  });
  function hide_address_form(address_type){
    $("#" + address_type + " .inner").hide();
    $("#" + address_type + " .inner input").prop("disabled", true);
    $("#" + address_type + " .inner select").prop("disabled", true);
  }
  
  function show_address_form(address_type){
    $("#" + address_type + " .inner").show();
    $("#" + address_type + " .inner input").prop("disabled", false);
    $("#" + address_type + " .inner select").prop("disabled", false);
  }
})(jQuery);
