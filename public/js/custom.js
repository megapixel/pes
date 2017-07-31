const DESIGN_API_ENPOINT = '/designs';
const DOCUMENT_API_ENPOINT = '/documents';

var tableWrapperWidth = 800;
var nameLists = {};
var bodyRows = {};
var contentEditor = '';
var tablesRender = {};
var designs = [];
var documents = [];
var isFirstScreen = true;
var mockupHash = {};

var state = {
  currentStep: 1,
  isRenderTable: {},
  json: {
    header: '<header></header>',
    footer: '<footer></footer>'
  },
  columns: [
  ]
};
var rr = false;

const TOTAL_STEPS = 3;

$('#btn-next').click(function() {
  if (state.currentStep == TOTAL_STEPS) {
    return;
  }

  $("#step-" + state.currentStep).removeClass('active');
  state.currentStep++;
  $('body').attr('class', "step-" + state.currentStep);

  if (state.currentStep == 2) {
    initToolbar('.toolbar');
    nameLists = {};
    bodyRows = {};
    updateNameList();
    var tableIds = Object.keys(nameLists);
    var $contentEditor = $(`<div class="step2-temp">${contentEditor}<\div>`);
    $("#step-2 .playground").empty().append($contentEditor);
    $(document).find('#step-2 .step2-temp').first().addClass('playground');
    $(document).find('#step-2 .step2-temp').each(function() {
      $(this).removeClass('step2-temp');
      $(this).unwrap();
    });

    var $tables = $contentEditor.find('table');
    tableIds.forEach(function(tableId) {
      if (state.isRenderTable[tableId]) {
        var nameList = nameLists[tableId];
        var bodyRow = bodyRows[tableId];
        var renderArea = `
          <div class="render-wrapper">
            <div class="form"></div>
          </div>
        `;
        var renderId = `render-${tableId}`;
        var $renderArea = $(renderArea);
        $renderArea.attr('id', renderId);
        $tables.eq(tableId).replaceWith($renderArea);
        myFormRender({
          nameList,
          formSelector:  `#render-${tableId} .form`,
          toolbarSelector: `#render-${tableId} .toolbar`,
          rows: bodyRow
        });
      }
    });
    $(document).find('#step-2 .step2-prev-temp').first().addClass('playground');
    $(document).find('#step-2 .step2-prev-temp').first().unwrap();
    $(document).find('#step-2 .step2-prev-temp').first().removeClass('step2-prev-temp');
    $("#step-2 .playground").nextAll().remove();
  }

  if (state.currentStep == 3) {
    renderFinal();
    $(document).find('.add-row-bottom').hide();
  }

  //show it
  $("#step-" + state.currentStep).addClass('active');
  isFirstScreen = false;
});

$('#btn-prev').click(function() {
  if (state.currentStep == 1) {
    state.isNewTable = false;
    return;
  }
  if (state.currentStep == 2) {
    var $renderArea = $(".editor-content");
    var contentStep2 = $("#step-2 .playground").html();
    var $contentStep2 = $(`<div class="step2-prev-temp">${contentStep2}<\div>`);
    $renderArea.empty().append($contentStep2);

    $renderArea.find(".render-wrapper").each(function(i, item) {
      var table = $(item).find('.form').html();
      var $table = $(table);
      $(item).replaceWith($table);
    })

    var $tables = $contentStep2.find('.dropTable');
    $tables.each(function(i,e) {
      var $table = createTablePrev($(this));
      $tables.eq(i).replaceWith($table);
    });

    $renderArea.find('.add-row-bottom').remove();
    contentEditor = $('.editor-content').html();
    setEditorContent('table-editor', contentEditor);
    $(document).find('textarea').each(function() {
      var value = $(this).attr('value');
      if(value) $(this).val(value);
    });
  }

  if (state.currentStep == 3) {
    $(document).find('.add-row-bottom').show();
  }

  $("#step-" + state.currentStep).removeClass('active');

  state.currentStep--;
  $('body').attr('class', "step-" + state.currentStep);

  //show it
  $("#step-" + state.currentStep).addClass('active');

});

function createTablePrev($table) {
  var w = tableWrapperWidth;
  var rows = [];
  $table.find('tbody tr').each(function() {
    var $tr = $('<tr>');
    var tds = [];
    $(this).find('td').not(':last-child').each(function() {
      var $td = $(this);
      var $newTd = $('<td>');
      $td.find('.widget .render').each(function(i, e) {
        $newTd.append($(e).children().clone().remove());
      });
      tds.push($newTd);
    });
    $tr.append(tds);
    rows.push($tr);
  });

  var $thead = $table.find('thead').clone().remove()
    , $tbody = $('<tbody>').append(rows)
    , $newTable = $('<table>')
      .addClass('table table-bordered');

  $thead.find('th:last-child').remove();
  var n = $thead.find('th').length;
  var thWidth = ~~(w/ n);
  $thead.find('th').each(function(i, e) {
    if (i < n) {
      $(this).css('width', thWidth + 'px');
    }
  });
  $newTable.append([$thead, $tbody]);
  return $newTable;
}

$("#export, #btn-save").click(function() {

  var $content = $("#modal-export .modal-body textarea");
  $('#render-content-temp').html($("#render-content-final").html());
  var $renderArea = $("#render-content-temp");
  var html = '';
  $renderArea.find('.add-row-bottom').remove();
  $renderArea.find('meta').remove();
  // $renderArea.find('div, ul, li, span, a, p, th, td').removeAttr('id').removeAttr('class');
  var contentStep3 = $("#render-content-temp").html();
  var $contentStep3 = $(`<div>${contentStep3}<\div>`);
  var $tables = $contentStep3.find('table');
  var content = htmlOutput(contentStep3.replace(/class=""/g, ''));
  $content.val(content);
  $renderArea.find('table').each(function(i,e) {
    var $eTable = $(e);
    $eTable.find('th div').remove();
    $eTable.find('th').removeClass('ui-resizable');
    html = $eTable[0].outerHTML;
    html = html.replace(/class=""/g, '');
    $tables.eq(i).replaceWith(html);
  });

  $("#modal-export").modal('show');
});

$("#btn-add-table").click(function() {
  var count = $(".table-config-wrapper").length;
  var tableConfig = `
    <div class="table-config-wrapper">
      <div class="row">
        <div class="col-sm-2">
          <div class="">
            <label for="num-cols">Number of columns:</label>
            <input class="form-control" type="number" name="num-cols" value="3">
          </div>
        </div>
        <div class="col-sm-10">
          <form class="form-inline">
            <div class="name-list-wrapper" class="form-group"></div>
          </form>
        </div>
      </div>
    </div>
  `;

  var $tableConfig = $(tableConfig).attr('id', `table-config-${count + 1}`);
  $("#step-1").append($tableConfig);
  $tableConfig.find('input[name=num-cols]').trigger('input');
});

function initToolbar(toolbarSelector) {
  $(toolbarSelector).empty().ListElements();
  if (isFirstScreen) {
    $(toolbarSelector).find('.widget').each((i, e) =>{
      var element = $(e).data('element');
      mockupHash[element] = $(e).clone().removeClass('hidden');
    })
  }
}

function getEditorContent(id) {
  return CKEDITOR.instances[id].getData();
}

function setEditorContent(id, html) {
  CKEDITOR.instances[id].setData(html);
}

function updateNameList() {
  var newNameLists = {};
  var newBodyRows = {};
  contentEditor = getEditorContent('table-editor');
  contentEditor = contentEditor.trim();
  var $contentEditor = $(`<div>${contentEditor}<\div>`);
  $contentEditor.find('table').each(function(idex) {
    var tableId = idex.toString();
    state.isRenderTable[tableId] = false;
    newNameLists[tableId] = [];
    newBodyRows[tableId] = [];
    $theadRows = $(this).find('thead tr');
    var hasThead = ($theadRows && $theadRows.length > 0);
    var inc = -1;
    if (hasThead) {
      inc = 0;
    }
    if (hasThead) {
      $(this).find('thead tr').each((i, tr) => {
        if (i == 0) {
          $(tr).find('td, th').each(function(j, cell) {
            newNameLists[tableId].push($(cell).html());
          });
        }
      });
    }

    $(this).find('tbody tr').each((i, tr) => {
      if (!hasThead && i == 0) {
        $(tr).find('td').each(function(j, cell) {
          newNameLists[tableId].push($(cell).html());
        });
      } else {
        newBodyRows[tableId][i+inc] = [];
        $(tr).find('td').each(function(j, cell) {
          newBodyRows[tableId][i+inc].push($(cell).html());
        });
      }
    });
  });

  var tableIds = Object.keys(newNameLists);
  for (var i = 0; i < tableIds.length; i++) {
    var tableId = tableIds[i];
    var newNameList = newNameLists[tableId] || [];
    var newBodyRow = newBodyRows[tableId] || [];
    var nameList = nameLists[tableId] || [];
    var bodyRow = bodyRows[tableId] || [];

    if (newNameList.length != nameList.length) {
      state.isRenderTable[tableId] = true;
      nameLists[tableId] = newNameList;
      bodyRows[tableId] = newBodyRow;
    } else {
      for (var idx = 0; idx < newNameList.length; idx++) {
        if (nameList[idx] !== newNameList[idx]) {
          state.isRenderTable[tableId] = true;
          nameLists[tableId] = newNameList;
          bodyRows[tableId] = newBodyRow;
          break;
        }
      }
    }
  }
}

function myFormRender(options) {
  let {nameList, formSelector, toolbarSelector, rows} = options;
  let lastTime = 0;

  function dropHandler($item, $droppable) {
    //TODO edit markup, change classes
    var NOW = new Date();
    if (NOW - lastTime < 100) return;

    var input = $($item).find('.hidden').clone().removeClass('hidden');
    $(input).appendTo($droppable);
    lastTime = NOW;
  }

  var n = nameList.length;
  var table = `
    <table class="dropTable table table-bordered">
      <thead>
        <tr>
        ${nameList.reduce(
          (left, right) => `${left}<th>${right}</th>`,''
        )}
        <th class="trans"></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  `;
  var $table = $(table);
  var $obj = $(formSelector);
  $obj.empty().append($table);
  $obj.append(
    `
    <div class="row add-row-bottom">
      <div class="col-md-2">
        <button class="btn-add-row btn btn-primary">
          <i class="glyphicon glyphicon-plus"></i> Add Row
        </button>
      </div>
      <div class="col-md-4" style="padding:0">
        <input class="form-control" placeholder="Save as table template"></input>
      </div>
      <div class="col-md-2">
        <button class="form-control btn-save-table btn btn-primary">Save</button>
      </div>
    </div>
    `
  );

  var tbody = $obj.find('tbody');

  $table.AreaDroppable();
  setTimeout(function() {
    var w = $(formSelector).width();
    var n = nameList.length;
    var thWidth = ~~((w - 42) / n);
    $obj.find('th').each(function(i, e) {
      if (i < n - 1) {
        $(this).css('width', thWidth + 'px');
      }
    })
  },200)

  var exports = {};
  exports.addDroppableRow = function(data) {
    if (data && data.length) {
      row = "";
      for (let item of data) {
        var text = $('<div>' + item + '</div>').text().trim();
        row += '<td><div class="droppable">';
        var items = getChildItems(item);
        if (!items.length) {
          if (text.length > 0) row += makeComponent('paragraph', '<p data-element="paragraph">' + item + '</p>');
        } else {
          items.forEach((item, i) => {
            if (item.type === undefined || item.type === null) {
              item.type = 'paragraph';
            }
            row += makeComponent(item.type, item.html);
          });
        }
        row += '</div></td>';
      }
    }

    var $tr = $(`
    <tr>
      ${row}
      <td class="trans">
        <button class="btn-remove-row btn btn-danger">
          <i class="glyphicon glyphicon-trash"></i>
        </button>
        <button class="btn-duplicate-row btn btn-primary" style="margin-top:5px">
          <i class="glyphicon glyphicon-duplicate"></i>
        </button>
      </td>
    </tr>`
  );

    tbody.append($tr);
    tbody.find('div.droppable').droppable({
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        dropHandler(ui.draggable, $(this));
      }
    });
  }
  exports.clone = function() {
    tbody.append(tbody.find('tr:last-child').clone());
  }

  exports.saveTable = function() {
    $_table = createTmpTable($table);
    setTimeout(function() {
      var $renderArea = $("#render-hidden");
      $renderArea.empty().append($_table);
      var html = $renderArea.html();
      var $content = $("#modal-export .modal-body textarea");
      $content.val(htmlOutput(html));
      $("#modal-export").modal('show');
    }, 500);

  }

  exports._ = {
    tbody: tbody,
    nameList: nameList
  }

  if (rows && rows.length) {
    for (let row of rows) {
      exports.addDroppableRow(row);
    }
  }

  $obj.find('.btn-add-row').click(exports.addDroppableRow);
  $obj.find('.btn-save-table').click(exports.saveTable);

  $(formSelector).on('click', '.btn-remove-row', function() {
    var $row = $(this).closest('tr');
    $row.remove();
  })

  $(formSelector).on('click', '.btn-duplicate-row', function() {
    var $row = $(this).closest('tr');
    $row.clone().insertAfter($row)
    .find('div.droppable').droppable({
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        dropHandler(ui.draggable, $(this));
      }
    });
  })
  return exports;
}

function numColCallback(e) {

  var numOfCol = $(e.target).val() - 0;
  var $tableConfig = $(e.target).closest('.table-config-wrapper');

  $tableConfig.find('.name-list-wrapper').html('');
  for(var i = 0; i < numOfCol; i++) {
      $tableConfig.find('.name-list-wrapper').append(
        `<div class="form-group">
          <input name="col-name" class="form-control" value="Title #${i + 1}"></input>
        </div>`
      );
  }
}
numColCallback({target: '#step-1 input[name=num-cols]'});
$('#step-1').on('input', 'input[name=num-cols]', numColCallback);
$('#step-1').on('keyup', 'input[name=num-cols]', numColCallback);

function renderFinal() {
  var $renderArea = $("#render-content-final");
  var contentStep2 = $("#step-2 .playground").html();
  var $contentStep2 = $(`<div>${contentStep2}<\div>`);
  $renderArea.empty().append($contentStep2);
  var $tables = $contentStep2.find('.dropTable');

  $tables.each(function(i,e) {
    var $table = createTable($(this));
    $tables.eq(i).replaceWith($table);
  });

  setTimeout(function() {
    $renderArea.find('table th').resizable();
  }, 300);
}

function createTable($table) {
  var w = tableWrapperWidth;
  var rows = [];
  $table.find('tbody tr').each(function() {
    var $tr = $('<tr>');
    var tds = [];
    $(this).find('td').not(':last-child').each(function() {
      var $td = $(this);
      var $newTd = $('<td>');
      $td.find('.widget .render').each(function(i, e) {
        $newTd.append($(e).children().clone().remove());
      })
      tds.push($newTd);
    });

    $tr.append(tds);
    rows.push($tr);
  });

  var $thead = $table.find('thead').clone().remove()
    , $tbody = $('<tbody>').append(rows)
    , $newTable = $('<table>')
      .addClass('table table-bordered');

  $thead.find('th:last-child').remove();
  var n = $thead.find('th').length;
  var thWidth = ~~(w/ n);
  $thead.find('th').each(function(i, e) {
    if (i < n - 1) {
      $(this).css('width', thWidth + 'px');
    }
  });

  $newTable.append([$thead, $tbody]);

  return $newTable;
}

function createTmpTable($table) {
  var w = tableWrapperWidth;
  var rows = [];
  $table.find('tbody tr').each(function() {
    var $tr = $('<tr>');
    var tds = [];
    $(this).find('td').not(':last-child').each(function() {
      var $td = $(this);
      var $newTd = $('<td>');
      $td.find('.widget .render').each(function(i, e) {
        $newTd.append($(e).children().clone().remove());
      })
      tds.push($newTd);
    });

    $tr.append(tds);
    rows.push($tr);
  });


  var $thead = $table.find('thead').clone().remove()
    , $tbody = $('<tbody>').append(rows)
    , $newTable = $('<table>')
      .addClass('table table-bordered');

  $thead.find('th:last-child').remove();
  var n = $thead.find('th').length;
  var thWidth = ~~((w - 42) / n);
  $thead.find('th').each(function(i, e) {
    if (i < n - 1) {
      $(this).css('width', thWidth + 'px');
    }
  });

  $newTable.append([$thead, $tbody]);

  return $newTable;
}

$('.not-implement').click(function() {
  swal('Sorry', 'This feature has not been implemented yet!', 'info')
});

function loadSelectDropdown() {
  $.get(DESIGN_API_ENPOINT, function(res) {
    designs = res.items;
  });
  $.get(DOCUMENT_API_ENPOINT, function(res) {
    documents = res.items;
  });
}

loadSelectDropdown();

function htmlOutput(str) {
  var html = html_beautify(str);
  return html.replace(/\n+/g, '\n');
}

$(document).ready(function() {
  tableWrapperWidth = $('#render-hidden').width();
})

var previous;
var select;
$(document).on('mousemove', '.select-test-result', function() {
  previous = $(this).val();
  select = $(this);
}).change(function() {
  if(select && select.val() == 2) {
    swal({
      title: "Do you want to continue?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
      closeOnConfirm: true,
      closeOnCancel: true
    },
    function(isConfirm){
      if (!isConfirm) {
        select.val(previous);
      }
    });
  }
});

$('#import-google-drive').click(loadPicker);
$('#import-computer').click(function() {
  $('#input-import-computer').click();
});

$('#input-import-computer').change(function() {
  var form = $(this).closest('form');
  var formData = new FormData(form[0]);
  form.addClass('disabled');
  $.ajax({
    type: 'POST',
    url: '/api/uploadFile',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function(json) {
      $('.file-temp').html(json.data);
      $('.file-temp').find('meta').remove();
      $('.file-temp').find('title').remove();
      var content = $('.file-temp').html().replace('<!-- Generated by PHPWord -->', '');
      if (!json.code) setEditorContent('table-editor', content);
      else swal("Error", '',"error");
      form.removeClass('disabled');
    }
  });
});

function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;
  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }
  return false;
}

$(document).on('keyup', 'input',function() {
  $(this).attr('value', $(this).val());
});

$(document).on('change', 'textarea',function() {
  $(this).text($(this).val());
});

$(document).on('change', 'input',function() {
  $(this).attr('value', $(this).val());
});


function makeComponent(type, item) {
  var $html = $(mockupHash[type]).clone();
  $html.find('.render').html(item);
  if (type == 'paragraph') $html.find('.render').find('p').attr('data-element', 'paragraph');
  var output = $(`<div></div>`).append($html).html();
  return output;
}


function getChildItems(html) {
  var output = [];
  $('<div>' + html + '</div>').children().each((i, e) => {
    var element = $(this).attr('data-element');
    if (element === undefined || element === null) $(this).attr('data-element', 'paragraph');
    output.push({
      type: $(e).data('element'),
      html: $(e)[0].outerHTML
    });
  });
  return output;
}
