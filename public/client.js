$(function() {
    $.get('/blocks', appendToBlockList);
    function appendToBlockList(blocks) {
        var list = [];
        var content, block;
        for(var i in blocks){            
            block = blocks[i];
            content = '<a href="/blocks/"' + block + '">' + block + '</a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();

        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
        }).done(function(blockName) {
            appendToBlockList([blockName]);
            form.trigger('reset');
        });
    });

    $.get('/cities', appendToCitiesList);
    function appendToCitiesList(cities) {
        var list = [];
        for(var i in cities){
            list.push($('<li>', { text: i + ': ' + cities[i] }));
        }
        $('.cities-list').append(list);
    }
});