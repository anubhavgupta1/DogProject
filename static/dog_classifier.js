$(function() {
  $("button#clear").click(function() {
    $("#stage")[0].dropzone.removeAllFiles();
    $("#drag_msg").show();
  });
  Dropzone.options.stage = {
    url: "/upload",
    parallelUploads: 1,
    maxThumbnailFilesize: 1,
    maxFilesize: 300,
    uploadMultiple: false,
    thumbnailWidth: 300,
    thumbnailHeight: 290,
    maxFiles: 1,
    previewTemplate:
      '<div class="dz-preview dz-file-preview">'+
        '<div class="dz-details text-center"><img data-dz-thumbnail _width="100%" style="_margin-top: 10px"/></div>'+
        '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'+
        '<div class="dz-error-message"><span data-dz-errormessage></span></div>'+
      '</div>',
    accept: function(file, done) {
      done();
    },
    init: function() {
      var statusLabel = $("#status");

      this.on('error', function(file, errorMessage) {
        if (file.accepted) {
          var mypreview = document.getElementsByClassName('dz-error');
          mypreview = mypreview[mypreview.length - 1];
          mypreview.classList.toggle('dz-error');
          mypreview.classList.toggle('dz-success');
        }
      });

      this.on("addedfile", function() {
        if (this.files[1] != null) {
          this.removeFile(this.files[0]);
        }
        $("#drag_msg").hide();
        $("#status").show();
      });
      this.on("processing", function(file) {
        console.log("processing");
        $("#status").text('processing')

        var table = $("#results");
        table.empty();
      })
      this.on("uploadprogress", function(file, progress, bytesSent) {
        console.log("uploadprogress");
        $("#status").text('アップロード中:'+Math.floor(progress)+'%');
        if (progress == 100) {
          $("#status").text('処理中...');
        }
      })
      this.on("sending", function(file) {
        console.log("sending");
      })
      this.on("success", function(file, response) {
        $("#status").text('success')
        console.log("success");
        console.log(response);

        var table = $("#results");

        var results = response['results'];
        if (results.length == 0) {
          $("#status").text('顔を検知出来ませんでした')

        } else {
          $(results).each(function(idx, item) {
            console.log(item);
            var id = "item-"+idx;
            var dropdownMenuId = "dropdown-"+idx;
            var html = ""+
              "<div class='row' data-top-member-id='"+item['top_member_id']+"'>"+
                "<div class='img pull-left'>"+
                  "<img src='"+item['file']+"'/>"+
                "</div>"+
                "<div class='names pull-left'>"+
                  "<table class='rank' id='"+id+"'>"+
                  "</table>"+
                "</div>"+
                "<div class='buttons pull-right'>"+
                  "<small>この分析結果は...</small>"+
                  "<div>"+
                    "<button type='button' class='btn btn-default btn-sm good'>"+
                      "<span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span>"+
                      "&nbsp;正解！"+
                    "</button>"+
                  "</div>"+
                  "<div class='dropdown'>"+
                    "<button type='button' class='btn btn-default btn-sm bad dropdown-toggle' "+
                      "data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' id='"+dropdownMenuId+"'>"+
                        "<span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span>"+
                        "&nbsp;不正解"+
                    "</button>"+
                    "<ul class='dropdown-menu' aria-labelledby='"+dropdownMenuId+"'>"+
                      "<li class='dropdown-header'>正解は...</li>"+
                      "<li><a href='#' data-member-id='0'>高城れに</a></li>"+
                      "<li><a href='#' data-member-id='1'>百田夏菜子</a></li>"+
                      "<li><a href='#' data-member-id='2'>玉井詩織</a></li>"+
                      "<li><a href='#' data-member-id='3'>佐々木彩夏</a></li>"+
                      "<li><a href='#' data-member-id='4'>有安杏果</a></li>"+
                      "<li><a href='#' data-member-id='-99'>それ以外の誤検知</a></li>"+
                    "</ul>"+
                  "</div>"+
                "</div>"+
                "<div class='clearfix'/>"+
              "</div>";


      this.on("error", function(file) {
        $("#status").text('error')
        console.log("error");
      })
    }
  };

});
