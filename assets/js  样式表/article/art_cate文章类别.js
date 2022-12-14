$(function () {
    layer = layui.layer
    form = layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '330px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('新增分类失败')
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }

        })
    })
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '330px'],
            title: '修该文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新分类数据失败')
                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                initArtCateList()
            }
        })
    })
    // 删除
    $('tbody').on('click', '.bun-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除分类数据失败')
                    layer.msg('删除分类数据成功');
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })
})
// 本来中午想多吃俩个晚饭