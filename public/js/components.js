(function($) {
  const MARKUPS = {
    design_data: `<div class="design-container"></div>`,
    buttonSignDate: '<p class="sign-date" data-sign-date="">[sign-date]</p>',
    buttonDataOut: '<button class="btn btn-default" data-doc-link-out="">Data Out</button>',
    heading: '<h2>Header</h2>',
    paragraph: '<p>Paragraph</p>',
    date: '<input type="date" class="form-control" placeholder="enter date"/>',
    number: '<input class="form-control" type="number"></input>',
    text: '<input class="form-control" type="text" data-test-text=""></input>',
    textarea: '<textarea class="form-control" data-test-text=""></textarea>',
    button: '<button class="btn btn-default">Button</button>',
    checkbox: '<div class="checkbox"><label><input type="checkbox" value="option-1"></input> Option 1</label></div>',
    radio: '<div class="radio"><label><input type="radio" value="option-1"></input> Option 1</label></div>',
    select_result: `
      <select class="form-control select-test-result">
        <option checked value="1">Pass</option>
        <option  value="2">Fail</option>
        <option  value="0">NA</option>
      </select>
    `,
    select_generic: `
      <select class="form-control">
        <option checked value="option-1">Option 1</option>
        <option  value="option-2">Option 2</option>
      </select>
    `
  }

  const NAMES = {
    text: 'TEXT SINGLE LINE',
    textarea: 'TEXT MULTIPLE LINES',
    select_result: 'SELECT (TEST RESULTS)',
    select_generic: 'SELECT (GENERIC)'
  };

  const ICONS = {
    buttonSignDate: 'glyphicon glyphicon-pencil',
    buttonDataOut: 'icon-button',
    heading: 'icon-header',
    paragraph: 'icon-paragraph',
    date: 'icon-date',
    number: 'icon-number',
    text: 'icon-text',
    textarea: 'icon-textarea',
    button: 'icon-button',
    checkbox: 'icon-checkbox-group',
    radio: 'icon-radio-group',
    select_result: 'icon-select',
    select_generic: 'icon-select'
  };

  function getTemplate(type, label, nameInput, value='') {
    var commonTemplateModal = `
      <div class="${type}-group control-group">
        <form>
          <div class="form-group">
            <div class="attribute">
              <label>Data Attribute:
                <input class="form-control" type="text" name="attribute" value="">
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>${label}:</label>
            <input class="form-control" name="${nameInput}" type="text" value="${value}"/>
          </div>
        </form>
      </div>
    `;

    return commonTemplateModal;
  }

  const DATA_ATTRIBUTES = {
    buttonSignDate: 'data-sign-date',
    buttonDataOut: 'data-doc-link-out',
    date: 'data-test-result-tag',
    number: 'data-test-result-tag',
    button: 'data-test-result-tag',
    checkbox: 'data-test-result-tag',
    radio: 'data-test-result-tag',
    select_result: 'data-attribute-test',
    select_generic: 'data-test-result-tag',
    text: 'data-test-text',
    textarea: 'data-test-text',
    heading: 'data-test-design-tag',
    paragraph: 'data-test-design-tag',
    paragraph: 'data-test-design-tag',
    paragraph: 'data-test-design-tag'
  };

  const OPTION_MARKUPS = {
    buttonDataOut: getTemplate('buttonSignDate', 'Title', 'button-title'),
    date: getTemplate('heading', 'Placeholder', 'date-placeholder'),
    button: getTemplate('button', 'Title', 'button-title', 'Button'),
    number: getTemplate('number', 'Placeholder', 'number-placeholder'),
    text: getTemplate('text', 'Placeholder', 'text-placeholder'),
    textarea: getTemplate('textarea', 'Placeholder', 'textarea-placeholder'),
    checkbox: `
      <div class="checkbox-group control-group">
        <form>
          <div class="form-group">
            <div class="attribute">
              <label>Data Attribute:
                <input class="form-control" type="text" name="attribute" value="">
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Options</label>
            <div>
              <label class="l50">Title</label>
              <label class="l50">Value</label>
            </div>
            <div class="pair-values">
              <input class="form-control" name="checkbox-text-1" value="Option 1"/>
              <input class="form-control" name="checkbox-value-1" value="option-1"/>
              <span class="btn-sm-remove">&times;</span>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button id="btn-add-checkbox" type="button" class="btn btn-success pull-right">Add Option</button>
            </div>
          </div>

        </form>

      </div>
    `,
    radio: `
      <div class="radio-group control-group">
        <form>
          <div class="form-group">
            <div class="attribute">
              <label>Data Attribute:
                <input class="form-control" type="text" name="attribute" value="">
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Options</label>
            <div>
              <label class="l50">Title</label>
              <label class="l50">Value</label>
            </div>
            <div class="pair-values">
              <input class="form-control" name="radio-text-1" value="Option 1"/>
              <input class="form-control" name="radio-value-1" value="option-1"/>
              <span class="btn-sm-remove">&times;</span>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button id="btn-add-radio" type="button" class="btn btn-success pull-right">Add Option</button>
            </div>
          </div>

        </form>

      </div>
    `,
    select_result: `
      <div class="select-group control-group">
        <form>
          <div class="form-group">
            <div class="attribute">
              <label>Data Attribute:
                <input class="form-control" type="text" name="attribute" value="">
              </label>
            </div>
          </div>

          <div class="form-group">

            <label>Options</label>
            <div>
              <label class="l50">Title</label>
              <label class="l50">Value</label>
            </div>
            <div class="pair-values">
              <input class="form-control" name="select-text-1" value="Pass"/>
              <input class="form-control" name="select-value-1" value="pass"/>
              <span class="btn-sm-remove">&times;</span>
            </div>
            <div class="pair-values">
              <input class="form-control" name="select-text-2" value="Fail"/>
              <input class="form-control" name="select-value-2" value="fail"/>
              <span class="btn-sm-remove">&times;</span>
            </div>
            <div class="pair-values">
              <input class="form-control" name="select-text-3" value="NA"/>
              <input class="form-control" name="select-value-3" value="na"/>
              <span class="btn-sm-remove">&times;</span>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button id="btn-add-select" type="button" class="btn btn-success pull-right">Add Option</button>
            </div>
          </div>

        </form>

      </div>
    `,
    select_generic: `
    <div class="select-group control-group">
      <form>
        <div class="form-group">
          <div class="attribute">
            <label>Data Attribute:
              <input class="form-control" type="text" name="attribute" value="">
            </label>
          </div>
        </div>

        <div class="form-group">

          <label>Options</label>
          <div>
            <label class="l50">Title</label>
            <label class="l50">Value</label>
          </div>
          <div class="pair-values">
            <input class="form-control" name="select-text-1" value="Option 1"/>
            <input class="form-control" name="select-value-1" value="option-1"/>
            <span class="btn-sm-remove">&times;</span>
          </div>
          <div class="pair-values">
            <input class="form-control" name="select-text-2" value="Option 2"/>
            <input class="form-control" name="select-value-2" value="option-2"/>
            <span class="btn-sm-remove">&times;</span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button id="btn-add-select" type="button" class="btn btn-success pull-right">Add Option</button>
          </div>
        </div>

      </form>

    </div>
    `,
    heading: `
      <div class="headeing-group control-group">
        <form class="form-horizonal">
          <div class="form-group">
            <div class="attribute">
              <label>Data Attribute:
                <input class="form-control" type="text" name="attribute" value="">
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Format:</label>
            <select name="heading-tag" class="form-control">
              <option value="h1">H1</option>
              <option checked value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="h4">H4</option>
              <option value="h5">H5</option>
              <option value="h6">H6</option>
            </select>
          </div>
          <div class="form-group">
            <label>Enter text:</label>
            <input class="form-control" name="heading-value" />
          </div>
        </form>
      </div>
    `,
    paragraph: `
    <div class="paragraph-group control-group">
      <div class="form-group">
        <div class="attribute">
          <label>Data Attribute:
            <input class="form-control" type="text" name="attribute" value="">
          </label>
        </div>
      </div>

      <form class="form-horizonal">
        <div class="form-group">
          <label>Enter text:</label>
          <textarea class="form-control" rows="10" placeholder="Some text">Paragraph</textarea>
        </div>
      </form>
    </div>
    `,
    buttonSignDate: `
    <div class="paragraph-group control-group">
      <div class="form-group">
        <div class="attribute">
          <label>Data Attribute:
            <input class="form-control" type="text" name="attribute" value="">
          </label>
        </div>
      </div>
    </div>
    `
  };

  const EDIT_CALLBACKS = {
    date: function($widget) {
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var defaultPlaceHolder = $widget.find('.render input').prop('placeholder');
        var placeHolder = $(this).find('input[name=date-placeholder]').val() || defaultPlaceHolder;
        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render input').prop('placeholder', placeHolder).attr(DATA_ATTRIBUTES['date'], attr);
      })

    },
    number: function($widget) {
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var defaultPlaceHolder = $widget.find('.render input').prop('placeholder');
        var placeHolder = $(this).find('input[name=number-placeholder]').val() || defaultPlaceHolder;
        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render input').prop('placeholder', placeHolder).attr(DATA_ATTRIBUTES['number'], attr);
      })
    },
    text: function($widget) {
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var defaultPlaceHolder = $widget.find('.render input').prop('placeholder');
        var placeHolder = $(this).find('input[name=text-placeholder]').val() || defaultPlaceHolder;
        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render input').prop('placeholder', placeHolder).attr(DATA_ATTRIBUTES['text'], attr);
      })
    },
    textarea: function($widget) {
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var defaultPlaceHolder = $widget.find('.render textarea').prop('placeholder');
        var placeHolder = $(this).find('input[name=textarea-placeholder]').val() || defaultPlaceHolder;
        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render textarea').prop('placeholder', placeHolder).attr(DATA_ATTRIBUTES['textarea'], attr);
      })
    },
    button: function($widget) {
      $widget.find('.modal').on('show.bs.modal', function() {
        var title = $widget.find('.render button').text();
        $widget.find('input[name="button-title"]').val(title);
      });
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var defaultTitle = $(this).find("input[name=button-title]").val() || $widget.find('.render button').text();
        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render button').text(defaultTitle).attr(DATA_ATTRIBUTES['button'], attr);
      })
    },
    buttonSignDate: function($widget) {

        $widget.find('.modal').on('show.bs.modal', function() {
        var title = $widget.find('.render p').text();
        $widget.find('input[name="button-title"]').val(title);
      });
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {

        var defaultTitle = $(this).find("input[name=button-title]").val() || $widget.find('.render button').text();

        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render p').attr(DATA_ATTRIBUTES['buttonSignDate'], attr);
      })
    },
     buttonDataOut: function($widget) {

      $widget.find('.modal').on('show.bs.modal', function() {
        var title = $widget.find('.render button').text();
        $widget.find('input[name="button-title"]').val(title);
      });
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {

        var defaultTitle = $(this).find("input[name=button-title]").val() || $widget.find('.render button').text();

        var attr = $(this).find('input[name=attribute]').val();
        $widget.find('.render button').text(defaultTitle).attr(DATA_ATTRIBUTES['buttonDataOut'], attr);
      })
    },

    //TODO: Show modal to input options
    checkbox: function($widget) {
      console.log("widget", $widget);
      $widget.find('.modal').modal('show');

      $widget.find("#btn-add-checkbox").unbind().click(function() {

        var $pairGroup = $widget.find(".control-group .pair-values").last().clone().remove();
        $pairGroup.find('input').each(function() {
          var name = $(this).attr('name');
          var arr = name.split("-");
          var count = parseInt(arr.pop()) + 1;
          arr.push(count)
          var newName = arr.join("-");
          var value = newName.indexOf("checkbox-text") > -1 ? 'Option ' : 'option-';
          value += count;
          $(this).attr('name', newName).val(value);
        });

        $widget.find(".checkbox-group .form-group").eq(1).append($pairGroup);
      });

      $widget.on('click', '.btn-sm-remove', function() {
        $(this).closest('.pair-values').remove();
      });

      $widget.find('.modal').on('hidden.bs.modal', function() {
        var $renderArea = $widget.find('.render').empty();
        var pairValues = $widget.find(".checkbox-group .pair-values");
        var attr = $(this).find("input[name=attribute]").val();
        pairValues.each(function(_,e) {
          var text = $(this).find("input[name^='checkbox-text']").val();
          var value = $(this).find("input[name^='checkbox-value']").val();
          var option = `<div class="checkbox"><label><input value="${value}" type="checkbox" ${DATA_ATTRIBUTES['checkbox']}="${attr}"}> ${text}</label></div>`;
          $renderArea.append(option);
        });
      });
    },
    radio: function($widget) {
      $widget.find('.modal').modal('show');

      $widget.find("#btn-add-radio").unbind().click(function() {

        var $pairGroup = $widget.find(".control-group .pair-values").last().clone().remove();
        console.log("pari", $pairGroup);
        $pairGroup.find('input').each(function() {
          var name = $(this).attr('name');
          var arr = name.split("-");
          var count = parseInt(arr.pop()) + 1;
          arr.push(count)
          var newName = arr.join("-");
          var value = newName.indexOf("radio-text") > -1 ? 'Option ' : 'option-';
          value += count;
          $(this).attr('name', newName).val(value);
        });

        $widget.find(".control-group .form-group").eq(1).append($pairGroup);
      });

      $widget.on('click', '.btn-sm-remove', function() {
        console.log("remove");
        $(this).closest('.pair-values').remove();
      });

      $widget.find('.modal').on('hidden.bs.modal', function() {
        var now = Date.now();
        var $renderArea = $widget.find('.render').empty();
        var pairValues = $widget.find(".control-group .pair-values");
        var attr = $(this).find("input[name=attribute]").val();
        pairValues.each(function(_,e) {
          var text = $(this).find("input[name^='radio-text']").val();
          var value = $(this).find("input[name^='radio-value']").val();

          var option = `<div class="radio"><label><input ${DATA_ATTRIBUTES['radio']}="${attr}" name="radio-${now}" value="${value}" type="radio"> ${text}</label></div>`;
          $renderArea.append(option);
        });
      });
    },
    select_result: function($widget) {
      $widget.find('.modal').modal('show');

      $widget.find("#btn-add-select").unbind().click(function() {

        var $pairGroup = $widget.find(".control-group .pair-values").last().clone().remove();
        console.log("pari", $pairGroup);
        $pairGroup.find('input').each(function() {
          var name = $(this).attr('name');
          var arr = name.split("-");
          var count = parseInt(arr.pop()) + 1;
          arr.push(count)
          var newName = arr.join("-");
          var value = newName.indexOf("select-text") > -1 ? 'Option ' : 'option-';
          value += count;
          $(this).attr('name', newName).val(value);
        });

        $widget.find(".control-group .form-group").eq(1).append($pairGroup);
      });

      $widget.on('click', '.btn-sm-remove', function() {
        $(this).closest('.pair-values').remove();
      });

      $widget.find('.modal').on('hidden.bs.modal', function() {
        var now = Date.now();
        var attr = $widget.find('input[name="attribute"]').val();
        var $renderArea = $widget.find('.render').empty();
        var pairValues = $widget.find(".control-group .pair-values");
        var options = [];
        pairValues.each(function(_,e) {
          var text = $(this).find("input[name^='select-text']").val();
          var value = $(this).find("input[name^='select-value']").val();
          var option = `
            <option value="${value}">${text}</option>
          `;
          options.push(option);
        });

        $renderArea.append(
          `<select class="form-control" ${DATA_ATTRIBUTES['select_result']}="${attr}">
            ${options.join("\n")}
          </select>`
        );
      });
    },
    select_generic: function($widget) {
      $widget.find('.modal').modal('show');

      $widget.find("#btn-add-select").unbind().click(function() {

        var $pairGroup = $widget.find(".control-group .pair-values").last().clone().remove();
        console.log("pari", $pairGroup);
        $pairGroup.find('input').each(function() {
          var name = $(this).attr('name');
          var arr = name.split("-");
          var count = parseInt(arr.pop()) + 1;
          arr.push(count)
          var newName = arr.join("-");
          var value = newName.indexOf("select-text") > -1 ? 'Option ' : 'option-';
          value += count;
          $(this).attr('name', newName).val(value);
        });

        $widget.find(".control-group .form-group").eq(1).append($pairGroup);
      });

      $widget.on('click', '.btn-sm-remove', function() {
        $(this).closest('.pair-values').remove();
      });

      $widget.find('.modal').on('hidden.bs.modal', function() {
        var now = Date.now();
        var attr = $widget.find('input[name="attribute"]').val();
        var $renderArea = $widget.find('.render').empty();
        var pairValues = $widget.find(".control-group .pair-values");
        var options = [];
        pairValues.each(function(_,e) {
          var text = $(this).find("input[name^='select-text']").val();
          var value = $(this).find("input[name^='select-value']").val();
          var option = `
            <option value="${value}">${text}</option>
          `;
          options.push(option);
        });

        $renderArea.append(
          `<select class="form-control" ${DATA_ATTRIBUTES['select_generic']}="${attr}">
            ${options.join("\n")}
          </select>`
        );
      });
    },
    heading: function($widget) {
      var tagName = '';
      var tagValue = '';
      $widget.find('.modal').on('show.bs.modal', function() {
        var child = $widget.find('.render').children();
        tagName = child[0].tagName.toLowerCase();
        tagValue = child[0].innerText;
        $widget.find('select[name="heading-tag"]').val(tagName);
        $widget.find('input[name="heading-value"]').val(tagValue);
      });
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var tagName = $widget.find('select[name=heading-tag]').val();
        var text = $widget.find('input[name=heading-value]').val();
        var $renderArea = $widget.find('.render').empty();
        var attr = $(this).find("input[name=attribute]").val();
        var $heading = $(`<${tagName} data-element="heading">${text}</${tagName}>`);
        $renderArea.append($heading);
      });
    },

    paragraph: function($widget) {
      $widget.find('.modal').on('show.bs.modal', function() {
        var title = $widget.find('.render p').text();
        $widget.find('textarea').val(title);
      });
      $widget.find('.modal').modal('show');
      $widget.find('.modal').on('hidden.bs.modal', function() {
        var text = $widget.find('textarea').val();
        $widget.find('.render p').text($widget.find('textarea').val());
      });
    }
  }

  var FBComponent = function(options) {

  }

  function elemRender(item) {
    var type = $(item).data('element');
    var html = `<div data-element="${type}">${MARKUPS[type]}</div>`;
    return html;
  }

  var ListElements = function(options) {
    var $list = $('<ul>').addClass('fb-list-group list-group');
    var markupList = Object.keys(MARKUPS).map(index => {
      var iconEdit = '<i class="glyphicon glyphicon-pencil btn-edit"></i>';
      if (index == 'buttonSignDate') {
        NAMES[index] = 'SIGN & DATE';
        iconEdit = '';
      }
      if (index == 'buttonDataOut') NAMES[index] = 'BUTTON DATA OUT';
      var template =
        `<a class="list-group-item" data-element="${index}">
          <div class="fb-draggable">
            <i class="${ICONS[index]}"></i>
            ${NAMES[index] || index.toUpperCase()}
          </div>
        </a>`;

      var modalTemplate = `
      <div class="widget hidden ${index}-control" data-element="${index}">
        <div class="toolbar-button">
          ${iconEdit}
          <i class="glyphicon glyphicon-trash btn-delete"></i>
        </div>

        <div class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Options</h4>
              </div>
              <div class="modal-body">
                ${OPTION_MARKUPS[index]}
              </div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="render">
          ${MARKUPS[index] || ''}
        </div>
      </div>
      `;

      var $template = $(template);

      if (index === 'design_data') {
        $template.empty().append('<div class="design-container"></div>');
        $template.find('.design-container').DesignComponent(designs);
        $template.find('.design-container').DesignComponentDocument(documents);
      } else {
        $template.find('.fb-draggable').append(modalTemplate);
      }

      $template.find('.widget').each((i, e) => {
        var element = $(e).data('element');
        var item = $(e).find('.render>*');
        $(item).attr('data-element', element);
      })

      return $template
    });

    //TODO
    var $container = $(this);
    $list.append(markupList.map(function(item) {
      var $item = $(item);
      $item.find('.fb-draggable').draggable({
        appendTo: 'body',
        cancel: "a.ui-icon", //TODO: update this
        cursor: "move",
        containment: 'window',
        stack: '.fb-list-group .fb-draggable',
        helper: function(event) {
          return $(event.target).clone().remove().addClass('dragging');
        },
        start: function(event, ui){
						$(this).draggable('instance').offset.click = {
            left: Math.floor(ui.helper.outerWidth(true) / 2),
            top: Math.floor(ui.helper.outerHeight(true) / 2)
          };
        },
      })

      return $item;
    }));
    this.append($list);

  }

  var AreaDroppable = function() {
    $(document).on('click', '.widget .btn-edit', function() {
      var $widget = $(this).closest('.widget');
      var type = $widget.data('element');
      if (typeof EDIT_CALLBACKS[type] === 'function') {
        EDIT_CALLBACKS[type]($widget);
      }
    })
    // $(this).on('click', '.widget .btn-delete', function() {
    //   var $widget = $(this).closest('.widget');
    //   $widget.remove();
    // })
  }

  $(document).on('click', '.widget .btn-delete', function() {
    $(this).closest('.widget').remove();
  });

  var DesignComponent = function(options) {
    var designTemplate = `
      <div class="design-data-component">
        <div class="heading text-center">ATTRIBUTES</div>
        <div class="body">

          <form class="form-horizonal">
            <div class="form-group">
              <label>NAME</label>
              <select class="form-control" name="design-data-select">
              </select>
            </div>
            <div class="form-group">
              <label>NAME</label>
              <div class="design-tag tag-name">
                <span></span>
                <div class="widget hidden">
                  <div class="toolbar-button">
                    <i class="glyphicon glyphicon-trash btn-delete"></i>
                  </div>
                  <div class="render">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>

              <label>DATA OUT BASED ON ATTRIBUTE</label>
              <div class="design-tag tag-dataoutsingle">
                <span></span>
                <div class="widget hidden">
                  <div class="toolbar-button">
                    <i class="glyphicon glyphicon-trash btn-delete"></i>
                  </div>
                  <div class="render">
                    <p></p>
                  </div>
                </div>
              </div>

            <div class="form-group">
              <div class="design-tag tag-dataoutmultiple">
                <span></span>
                <div class="widget hidden">
                  <div class="toolbar-button">
                    <i class="glyphicon glyphicon-trash btn-delete"></i>
                  </div>
                  <div class="render">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>TEST RESULTS DROPDOWN BASED ON ATTRIBUTE</label>
              <div class="design-tag tag-data">
                <span></span>
                <div class="widget hidden">
                  <div class="toolbar-button">
                    <i class="glyphicon glyphicon-trash btn-delete"></i>
                  </div>
                  <div class="render">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    var $component = '';
    var hash = {};

    if (!$component && $.isArray(options)) {
      $component = $(designTemplate);
      setData(options);
      $(this).append($component);
    }

    switch (arguments[0]) {
      case 'setData':
        return setData(arguments[1]);
        break;
      case 'selectId':
        return selectId(arguments[1]);
        break;
      default:

    }
    $component.find(".design-tag").each(function() {
      $(this).draggable({
        appendTo: 'body',
        cancel: "a.ui-icon", //TODO: update this
        cursor: "move",
        containment: 'window',
        stack: '.fb-list-group .fb-draggable',
        helper: function(event) {
          return $(event.target).clone().remove().addClass('dragging');
        },
        start: function(event, ui){
            $(this).draggable('instance').offset.click = {
            left: Math.floor(ui.helper.outerWidth(true) / 2),
            top: Math.floor(ui.helper.outerHeight(true) / 2)
          };
        }
      })
    });

    $component.find('select').change(function() {
      var id = $(this).val();
      bindData(id);
    });

    function bindData(id) {
      var obj = hash[id];
      $component.find('.design-tag.tag-name > span').text(obj.name);
      $component.find('.design-tag.tag-name .widget p').text(obj.name);
      $component.find('.design-tag.tag-name .widget p').attr('data-in-attribute-id', obj.id);

      $component.find('.design-tag.tag-dataoutsingle > span').html('<i class="icon-text"></i>TEXT SINGLE LINE W/ ATTRIBUTE ID');
      $component.find('.design-tag.tag-dataoutsingle .widget p').html(`<input class="form-control" type="text" placeholder="`+obj.name+`"></input>`);
      $component.find('.design-tag.tag-dataoutsingle .widget input').attr('data-out-attribute-id', obj.id);

      $component.find('.design-tag.tag-dataoutmultiple > span').html('<i class="icon-text"></i>TEXT MULTIPLE LINE W/ ATTRIBUTE ID');
      $component.find('.design-tag.tag-dataoutmultiple .widget p').html(`<textarea class="form-control" placeholder="`+obj.name+`"></textarea>`);
      $component.find('.design-tag.tag-dataoutmultiple .widget textarea').attr('data-out-attribute-id', obj.id);

      $component.find('.design-tag.tag-data > span').html('<i class="icon-select"></i>SELECT (TEST RESULTS)');
      $component.find('.design-tag.tag-data .widget p').html(`
      <select class="form-control select-test-result" >
        <option checked value="1">Pass</option>
        <option  value="2">Fail</option>
        <option  value="0">NA</option>
      </select>
    `);
      $component.find('.design-tag.tag-data .widget select').attr('data-result-state', obj.id);

      return this;
    }

    function setData(objects) {
      objects = objects || [];
      var $select = $component.find('select').first();
      objects.forEach(function(data) {
        hash[data.id] = data;
        var $option = $('<option>').attr('value', data.id).text(data.name)
        $select.append($option);
      });
      if (objects && objects[0] && objects[0].id) {
        $select.val(objects[0].id);
        selectId(objects[0].id);
      }
      return this;
    }

    function selectId(id) {
      return bindData(id);
    }
    return this;
  };

  var DesignComponentDocument = function(options) {
    var designTemplate = `
      <div class="design-data-component">
        <div class="heading text-center">DOCUMENT LINK</div>
        <div class="body">
          <form class="form-horizonal">
            <div class="form-group">
              <label>DOCUMENT NAME</label>
              <select class="form-control" name="document-data-select">
              </select>
            </div>
            <div class="form-group">
              <div class="design-tag tag-name">
                <a href="#" data-doc-link=""></a>
                <div class="widget hidden">
                  <div class="toolbar-button">
                    <i class="glyphicon glyphicon-trash btn-delete"></i>
                  </div>
                  <div class="render">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    var $component = '';
    var hash = {};

    if (!$component && $.isArray(options)) {
      $component = $(designTemplate);
      setData(options);
      $(this).append($component);
    }

    switch (arguments[0]) {
      case 'setData':
        return setData(arguments[1]);
        break;
      case 'selectId':
        return selectId(arguments[1]);
        break;
      default:

    }
    $component.find(".design-tag").each(function() {
      $(this).draggable({
        appendTo: 'body',
        cancel: "a.ui-icon", //TODO: update this
        cursor: "move",
        containment: 'window',
        stack: '.fb-list-group .fb-draggable',
        helper: function(event) {
          return $(event.target).clone().remove().addClass('dragging');
        },
        start: function(event, ui){
            $(this).draggable('instance').offset.click = {
            left: Math.floor(ui.helper.outerWidth(true) / 2),
            top: Math.floor(ui.helper.outerHeight(true) / 2)
          };
        }
      })
    });

    $component.find('select').change(function() {
      var id = $(this).val();
      bindData(id);
    });

    function bindData(id) {
      var obj = hash[id];
      $component.find('.design-tag.tag-name > a').text(obj.name);
      $component.find('.design-tag.tag-name .widget p').text(obj.name);
      //$component.find('.design-tag.tag-name .widget p').attr('data-doc-link', obj.id);

      $component.find('.design-tag.tag-name .widget p').html(`
      <a href="#" data-doc-link-in="`+obj.id+`">`+obj.name+`</a>`);





      return this;
    }

    function setData(objects) {
      objects = objects || [];
      var $select = $component.find('select').first();
      objects.forEach(function(data) {
        hash[data.id] = data;
        var $option = $('<option>').attr('value', data.id).text(data.name)
        $select.append($option);
      });
      if (objects && objects[0] && objects[0].id) {
        $select.val(objects[0].id);
        selectId(objects[0].id);
      }
      return this;
    }

    function selectId(id) {
      return bindData(id);
    }
    return this;
  };

  $.fn.AreaDroppable = AreaDroppable;
  $.fn.ListElements = ListElements;
  $.fn.DesignComponent = DesignComponent;
  $.fn.DesignComponentDocument = DesignComponentDocument;
})(jQuery);
