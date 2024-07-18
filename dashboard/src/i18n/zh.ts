export const zh = {
  translation: {
    filter: {
      label: '筛选器',
      labels: '筛选器',
      add: '新增筛选器',
      manage: '管理筛选器',
      show_filters: '展开筛选器',
      hide_filters: '收起筛选器',
      field: {
        widget: '控件',
        visible_in: '在...视图中可见',
        key_placeholder: '用于引用此筛选器，需保持唯一',
        label_placeholder: '用于展示的标签文案',
        auto_submit: '自动提交',
        order: '排列次序',
        custom_default_value: {
          trigger: '自定义',
          title: '自定义默认值',
          tips: '提示',
          tip_1: '在指定筛选器默认值这事上，自定义函数具备最高优先级',
          tip_2: '清空下方编辑器来禁用本功能',
        },
      },
      widget: {
        names: {
          select: '单选',
          multi_select: '多选',
          tree_select: '树形选择器',
          text_input: '文本框',
          checkbox: '勾选框',
          date_range: '日期范围',
        },
        common: {
          use_query_data_as_options: '使用所查数据为选项',
          fetch_options_from_datasource: '从数据源查选项',
          or_fetch_options_from_datasource: '或从数据源查选项',
          selector_option_empty: '无选项可用',
          see_data_structure: '点击查看期望的数据格式',
          using_query: '在用查询获取选项',
          default_selection_count: '默认选中前N项',
          min_width: '控件最小宽度',
          x_selected: '已选数：{{count}}',
        },
        text_input: {
          default_value: '默认值',
          required: '必填',
        },
        select: {
          width: '控件宽度',
          required: '必选',
          clearable: '可取消选择',
          configure_options: '配置选项',
          default_selection: '默认选项',
          no_default_selection: '无',
          select_first_option_by_default: '默认选中第一个选项',
        },
        multi_select: {
          width_description: '至少160px',
        },
        tree_select: {
          strictly: '枝叶节点不相关，各选各的',
        },
        checkbox: {
          description: '描述信息',
          default_checked: '默认勾选',
        },
        date_range: {
          required: '必选',
          allow_single_date: '允许选一天作为范围',
          display_format: '展示格式',
          max_days: '最大选择天数',
          one_day: '1天',
          x_days: '{{count}}天',
          x_max_days: '最多可选{{max_days}}天',
          default_value: '默认日期范围（具体）',
          default_by_shortcut: '默认日期范围（快捷方式）',
          default_by_shortcut_placeholder: '优先于左侧',
          start_date: '开始日期',
          end_date: '结束日期',
          shortcut: {
            last: {
              label: '过往整周期',
              d: '昨天',
              w: '周',
              m: '月',
              m2: '两个月',
              m3: '三个月',
              y: '年',
              full: {
                d: '昨天',
                w: '上周',
                m: '上个月',
                m2: '上两月',
                m3: '上三月',
                y: '去年',
              },
            },
            recent: {
              label: '最近',
              d7: '7天',
              d30: '30天',
              d60: '60天',
              d90: '90天',
              d180: '180天',
              d365: '365天',
              full: {
                d7: '近7天',
                d30: '近30天',
                d60: '近60天',
                d90: '近90天',
                d180: '近180天',
                d365: '近365天',
              },
            },
            this: {
              label: '当前整周期',
              d: '今天',
              w: '周',
              m: '月',
              y: '年',
              full: {
                d: '今天',
                w: '本周',
                m: '本月',
                y: '今年',
              },
            },
            this_so_far: {
              label: '至今',
              w: '周',
              m: '月',
              y: '年',
              full: {
                w: '本周至今',
                m: '本月至今',
                y: '本年至今',
              },
            },
          },
        },
      },
    },
    view: {
      label: '视图',
      labels: '视图',
      add: '新增视图',
      delete: '删除此视图',
      download_schema: '下载此视图描述文件',
      component: {
        div: {
          label: '内容',
        },
        tabs: {
          label: '标签页',
          tabs_settings: '标签页设置',
          tab: {
            name: '名称',
            view: '内容视图',
            order: '排列次序',
            color: '颜色',
            delete: '删除这个标签页',
            switch_to_view: '打开视图: {{name}}',
          },
        },
        modal: {
          label: '弹窗',
          modal_settings: '弹窗设置',
          title: '弹窗标题',
          custom_title: '自定义弹窗标题',
          width: '宽度',
          height: '高度',
        },
      },
    },
    interactions: {
      label: '交互',
      add: '新增交互',
      interactions_viewer: '纵览交互',
      unavailable: '不可用',
      unavailable_reason: '此可视化组件没有交互功能',
      trigger: {
        setup: '设置触发动作',
        label: '触发动作',
        payload: '触发时的参数',
      },
      operation: {
        setup: '操作设置',
        label: '操作',
        settings: '设置',
        variables: '变量',
        console_log: {
          label: 'console.log | 调试用',
          log_content: '打印内容',
        },
        open_link: {
          label: '打开链接',
          url: 'URL',
          open_in_new_tab: '在新标签页中打开',
        },
        open_view: {
          label: '唤出视图',
          view: '视图',
        },
        set_filter_values: {
          label: '设置筛选器值',
          set_filter: '将筛选器的值',
          with: '设为',
        },
        clear_filter_values: {
          label: '清除筛选器值',
          select_filter: '选择筛选器以清除其值',
        },
      },
    },
    query_variable: {
      label: '查询变量',
      labels: '查询变量',
      add: '新增变量',
      guide: {
        tabs: {
          guide: '使用指南',
          variables_in_this_dashboard: '本看板中的查询变量',
          global_sql_snippets: '全局SQL片段',
        },
      },
      open: '查看查询变量',
    },
    sql_snippet: {
      label: 'SQL片段',
      labels: 'SQL片段',
      add: '新增SQL片段',
      delete: '删除这个SQL片段',
      delete_unused: '删除未用到的SQL片段',
      manage: '管理SQL片段',
      key: '键',
      key_occupied: '此键已被其他SQL片段占用',
      edit_snippet: '编辑SQL片段',
      preview_snippet: '预览SQL片段',
      usage: {
        label: '使用情况',
      },
    },
    global_sql_snippet: {
      label: '全局SQL片段',
      labels: '全局SQL片段',
      description: '管理员负责在系统设置中维护全局SQL片段',
    },
    common: {
      titles: {
        settings: '设置',
        edit: '编辑',
        config: '配置',
      },
      pagination: {
        page_size: '页容量',
        total: '共',
        total_rows: '共 {{total}} 行',
      },
      align: {
        horizontal: {
          label: '水平对齐',
          left: '居左',
          center: '居中',
          right: '居右',
        },
        vertical: {
          label: '垂直对齐',
          top: '居上',
          center: '居中',
          bottom: '居下',
        },
      },
      id: 'ID',
      name: '名称',
      key: '键',
      label: '标签',
      value: '值',
      type: '类型',
      info: '信息',
      min: '最小值',
      max: '最大值',
      data_field: '数据字段',
      name_data_field: '名称字段',
      value_data_field: '值字段',
      color_data_field: '颜色字段',
      enabled: '启用',
      copied: '已复制到剪切板',
      action: '操作',
      actions: {
        open: '打开',
        close: '关闭',
        save: '保存',
        save_changes: '保存改动',
        revert: '还原',
        revert_changes: '还原改动',
        reset_to_default: '重置为初始值',
        init_with_default: '初始化',
        select_all: '全选',
        clear: '清除',
        clear_selection: '撤销选择',
        refresh: '刷新',
        download_data: '下载数据',
        download_schema: '下载描述文件',
        download_screenshot: '下载截图',
        enter_fullscreen: '全屏',
        duplicate: '复制',
        delete: '删除',
        cancel: '取消',
        confirm: '确认',
        add_an_option: '新增选项',
        edit: '编辑',
        end_editing: '结束编辑 <1>{{name}}</1>',
      },
      tabs: {
        variant: {
          label: '风格',
          default: '默认',
          outline: '轮廓',
          pills: '胶囊',
        },
        orientation: {
          label: '朝向',
          horizontal: '水平',
          vertical: '垂直',
        },
        grow_tabs: '拉伸标签卡宽度',
      },
      choose_a_tab_first: '请先选择一个标签页',
    },
    breakpoint: {
      label_one: '屏幕尺寸',
      label_other: '屏幕尺寸',
      add: '新增屏幕尺寸',
      manage: '管理屏幕尺寸',
      breakpoint: '最小宽度',
    },
    context: {
      label: '上下文',
    },
    mock_context: {
      label: '模拟上下文',
      hint: '内容格式为JSON',
    },
    panel: {
      label: '卡片',
      labels: '卡片',
      add: '新增卡片',
      delete: '删除这个卡片',
      panel_name: '卡片名',
      panel_description: '卡片描述',
      panel_description_click: '点击查看卡片描述',
      show_title: '展示卡片标题',
      use_name_as_title: '使用卡片名作为标题',
      settings: {
        change_view: '移至另一个视图下',
        change_view_title: '移动此卡片至另一个视图下',
        choose_queries: '关联查询',
        need_to_choose_queries: '请关联至少一个查询以使用其数据',
      },
      style: {
        label: '样式',
        width: '宽',
        width_postfix: '之 36 栏',
        height: '高',
        height_postfix: 'px',
        border: '边框',
      },
      variable: {
        label: '变量',
        labels: '变量',
        add: '新增变量',
        delete: '删除此变量',
        aggregation: {
          label: '聚合',
          fallback_value: '兜底值',
          fallback_value_description: '当数据为空或聚合结果非数字时，使用此兜底值',
        },
      },
    },
    style: {
      label: '样式',
      font_size: {
        label: '字号',
        placeholder: '10px, 1em, 1rem, 100%...',
      },
      font_weight: {
        label: '字重',
      },
      size: {
        xs: '特小',
        sm: '小',
        md: '中',
        lg: '大',
        xl: '特大',
      },
      flex: {
        justify_content: {
          label: '内容分布',
          left: '从左起',
          center: '居中',
          right: '从右起',
          space_between: '均匀分布，首尾顶格',
          space_around: '均匀分布，首尾留空一半',
          space_evenly: '均匀分布，首尾留空',
        },
        align_items: {
          label: '对齐位置',
          start: '起点对齐',
          center: '居中对齐',
          end: '末端对齐',
          stretch: '拉伸对齐',
        },
      },
      color: {
        type: {
          label: '颜色类型',
          static: '单色',
          interpolation: '插值取色',
          none: '无',
        },
        interpolation: {
          setup: '设置取色方案',
          palette: {
            label: '色板',
            category: {
              sequential: '单色渐变',
              diverging: '双色渐变',
            },
            red_green: '红 / 绿',
            yellow_blue: '黄 / 蓝',
            red: '红',
            green: '绿',
            blue: '蓝',
            orange: '橙',
            mapping: {
              value_input_label: '映射一个值到此颜色',
            },
          },
        },
      },
    },
    query: {
      label: '查询',
      labels: '查询',
      add: '新增查询',
      delete: '删除这个查询',
      cant_delete: '此查询在使用中，不能删除。请查看“使用情况”标签页以了解详情',
      delete_unused: '删除未用到的查询',
      name: '名称',
      name_description: '唯一名称',
      manage: '管理查询',
      open: '打开此查询',
      configurations: '配置',
      basics: '基本信息',
      conditions: '条件',
      run_by_condition: {
        label: '以下条件满足时，才运行本查询',
        unset: '看板加载时便运行本查询',
      },
      re_run_condition: {
        label: '当以下条件改变时，重新运行此查询',
        unset: '留空则永不重新运行此查询',
      },
      dependency: {
        label: '依赖',
        has_none: '此查询无依赖',
      },
      edit_sql: '编辑SQL',
      preview_sql: '预览SQL',
      request: '请求',
      build_request: '构造请求',
      process_request: '加工请求',
      process_result: '加工结果',
      usage: {
        label: '使用情况',
        in_views: '所在视图',
        unused_description: '此查询未被任何筛选器或卡片用到',
      },
      transform: {
        label: '查询变形',
        full_label: '查询变形',
        data_source: '基于其他查询的数据，加工出新数据',
        guide: {
          pick_queries: '选择一至多个查询作为数据输入',
          write_function: '编写函数，返回新数据',
        },
      },
    },
    data: {
      label: '数据',
      preview_data: '预览数据',
      empty_data: '无数据',
      requires_data: '请先关联查询',
    },
    data_source: {
      label: '数据源',
      explore: '查看数据源',
      explorer: '数据源查看器',
      table_structure: '数据表结构',
      table_structure_short: '表结构',
      see_table_structure: '查看数据表结构',
    },
    visualization: {
      label: '可视化',
      component: '可视化组件',
      label_short: '可视化',
    },
    numbro: {
      format: {
        label: '格式',
        absolute: '绝对值',
        absolute_description: '非负',
        abbreviation: '缩写',
        abbreviation_description: '如1.23k、1.23m',
        mantissa: '小数',
        trim_mantissa: '抹零',
        trim_mantissa_description: '省略末尾的零',
        preview: {
          open: '展开预览',
          close: '收起预览',
          input: '输入',
          output: '输出',
        },
      },
    },
    import: {
      label: '导入...',
      title: '自描述文件导入看板内容',
      json_file: '描述文件（JSON格式）',
      this_dashboard: '此看板',
      this_file: '此文件',
    },
    function_utils: {
      trigger_text: '关于utils参数',
      modal_title: '关于utils参数',
      description: '参数 <code>utils</code> 是 <code>FunctionUtils</code>，包含以下内容：',
      document: '文档',
    },
    aggregation: {
      option: {
        none: '无',
        sum: '和',
        mean: '平均值',
        median: '中位数',
        min: '最小值',
        max: '最大值',
        cov: '变异系数',
        std: '标准差',
        quantile: {
          label: '分位',
          label_with_hint: '分位(99%, 95%, ...)',
        },
        custom: {
          label: '自定义',
          label_trigger: '编写函数',
          title: '自定义聚合方式',
        },
        pick_record: {
          label: '直接选择数据',
          method: {
            label: '数据记录',
            first: '第一条',
            last: '最后一条',
          },
        },
      },
    },
    rich_text: {
      label: '富文本',
      content: {
        label: '内容',
      },
      dynamic_color: {
        label: '动态颜色',
        edit: '编辑动态颜色',
      },
    },
    chart: {
      chart_config: '图表设置',
      data_field: '数据字段',
      groups: {
        merico_suite: '思码逸套件',
        echarts_based_charts: '基于ECharts的图表',
        others: '其他',
      },
      label: {
        label: '文案',
        label_full: '标签文案',
        label_style: '标签文案样式',
        label_format: '标签文案格式',
      },
      label_position: {
        label: '文案位置',
        off: '不显示文案',
        top: '上',
        left: '左',
        right: '右',
        bottom: '下',
        inside: '内',
        inside_top: '内-上',
        inside_left: '内-左',
        inside_center: '内-中',
        inside_right: '内-右',
        inside_bottom: '内-下',
        inside_top_left: '内-上-左',
        inside_top_right: '内-上-右',
        inside_bottom_left: '内-下-左',
        inside_bottom_right: '内-下-右',
        outside: '外',
      },
      visual_map: {
        label: '视觉映射',
        continuous: {
          label: '连续型',
        },
        piecewise: {
          label: '分段型',
          mode: {
            pieces: '连续数据',
            categories: '离散数据',
          },
          add_a_piece: '加一个分段',
          interval: '值区间',
          piece_label: '文案',
        },
        bar_width: '长条的宽度',
        bar_height: '长条的高度',
        item_width: '小块的宽度',
        item_height: '小块的高度',
        calculable: '显示拖拽手柄',
        min_value: '最小值',
        max_value: '最大值',
        min_text: '最小值文案',
        max_text: '最大值文案',
        use_palette_x: '使用配色方案"{{x}}"',
        built_in_palettes: '内置配色方案',
        precision: '数据精度',
        skip_range: {
          lt_min: '小于最小值时的颜色',
          min: '最小值的颜色',
          max: '最大值的颜色',
          gt_max: '大于最大值时的颜色',
          follow_visual_map: '颜色跟随渐变规则',
        },
      },
      number_or_dynamic_value: {
        type: {
          static: '具体值',
          dynamic: '动态值',
        },
        dynamic: {
          setup: '设置',
          setup_title: '设置动态值',
          guide: '由函数确定动态值',
        },
      },
      orientation: {
        label: '朝向',
        horizontal: '水平',
        vertical: '垂直',
      },
      symbol_size: {
        label: '标记点大小',
        static: '固定值',
        dynamic: '动态值',
        setup: {
          label: '设置',
          title: '设置动态值',
          description: '由函数确定动态值',
        },
      },
      series: {
        label: '系列',
        name: '名称',
        y_axis: 'Y轴',
        data_field: '数据字段',
        add: '增加一个系列',
        delete: '删除这个系列',
        line: {
          label: '线',
          line_settings: '线段设置',
          line_style: '线条样式',
          type: {
            label: '类型',
            solid: '实线',
            dashed: '方虚线',
            dotted: '圆点虚线',
          },
          line_width: '线宽',
          step: {
            label: '阶梯状',
            off: '不启用',
            start: '在当前点拐弯',
            middle: '在当前点与下个点中间拐弯',
            end: '在下个点拐弯',
          },
          smooth_line: '平滑曲线',
          show_name_on_line: '显示标签文案',
          show_symbol_on_line: '显示标记点',
        },
        bar: {
          label: '柱',
          stack: '堆放',
          stack_hint: '此值相同的柱系列会堆叠在一起',
          bar_gap: {
            label: '柱间隔',
            no_gap: '柱子之间无间隔',
            overlap: '柱子可互相重叠',
          },
          bar_width: {
            min: '最小柱宽',
            exact: '柱宽',
            max: '最大柱宽',
          },
        },
        scatter: {
          label: '散点',
        },
        group_by: {
          label: '按此字段拆分为多个系列',
          label_line: '按此字段拆分为多条线',
        },
      },
      axis: {
        tick_label: '刻度文案',
        customize_label: '自定义文案',
        overflow: {
          label: '溢出',
          max_width: '最大宽度',
          truncate: '截断',
          break_line: '换行',
          break_word: '断词换行',
          ellipsis: '省略符',
          section_title: {
            on_axis: '轴刻度上文案的溢出',
            in_tooltip: '提示框中的文案溢出',
          },
        },
        section_title: {
          label_format: '文案格式',
        },
        type: {
          value: '数值轴',
          category: '类目轴',
          time: '时间轴',
          log: '对数轴',
          click_to_learn_more: '点击 <1>这里</1> 以进一步了解这些选项',
        },
      },
      name_text: {
        align: {
          label: '名称贴靠侧',
          left: '左',
          center: '中',
          right: '右',
        },
      },
      rotate: '旋转',
      degree: '度',
      padding: '内间距',
      content_template: {
        label: '内容模板',
        hint: '均值: ${avg}',
      },
      x_axis: {
        label: 'X轴',
        labels: 'X轴',
        label_format: '刻度文案格式',
        add: '增加一条X轴',
        delete: '删除这条X轴',
        x_axis_name: 'X轴名称',
        x_axis_data_field: 'X轴数据字段',
        x_axis_type: 'X轴类型',
        layout: '布局',
        position: {
          label: '位置',
          top: '上',
          bottom: '下',
        },
        value_range: '值范围',
        value_min: '最小值',
        value_max: '最大值',
        behavior: '表现',
        visible: '可见',
      },
      y_axis: {
        label: 'Y轴',
        labels: 'Y轴',
        label_format: '刻度文案格式',
        add: '增加一条Y轴',
        delete: '删除这条Y轴',
        y_axis_name: 'Y轴名称',
        y_axis_name_anchor: '名称贴靠侧',
        y_axis_data_field: 'Y轴数据字段',
        layout: '布局',
        position: {
          label: '位置',
          left: '左',
          right: '右',
        },
        value_range: '值范围',
        value_min: '最小值',
        value_max: '最大值',
        behavior: '表现',
        visible: '可见',
      },
      stats: {
        label: '统计内容',
        template: {
          above_chart: '统计内容模板（图表上方）',
          under_chart: '统计内容模板（图表下方）',
        },
      },
      legend: {
        label: '图例',
        show_legend: '显示图例',
        show_in_legend: '显示在图例中',
        hide_in_legend: '不显示在图例中',
        orientation: {
          label: '布局朝向',
          horizontal: '横向',
          vertical: '纵向',
        },
      },
      tooltip: {
        label: '提示框',
        additional_metrics: {
          description: '在此设置更多指标，来展示在散点的提示框',
          add: '增加一个指标',
          delete: '删除这个指标',
        },
        trigger: {
          label: '触发者',
          scatter_point: '散点',
          x_axis: 'X轴',
        },
      },
      style: {
        label: '样式',
      },
      color: {
        label: '颜色',
        or: '或',
        set_any_color: '输入色号',
        pick_a_theme_color: '选择一个主题色',
        background_color: '背景色',
        text_color: '文字颜色',
        click_to_add_a_color: '点击增加一个颜色',
        color_gradient: '颜色渐变',
      },
      behavior: {
        label: '表现',
        invisible: '隐藏不可见',
      },
      heatmap: {
        heatblock: {
          label: '热力块',
          show_label: '展示值文案',
        },
      },
      reference_line: {
        label: '参考线',
        labels: '参考线',
        add: '增加一条参考线',
        name_placeholder: '均值参考线',
        delete: '删除这条参考线',
        orientation: {
          vertical_hint: '仅当X轴值为数字时可绘制',
        },
      },
      regression_line: {
        label: '回归线',
        labels: '回归线',
        add: '增加一条回归线',
        delete: '删除这条回归线',
        method: {
          label: '方法',
          linear: '线性回归',
          exponential: '指数回归',
          logistic: '指数回归',
          polynomial: '多项式回归',
          polynomial_order: '次',
        },
      },
      reference_area: {
        label: '参考区域',
        labels: '参考区域',
        add: '增加一面参考区域',
        delete: '删除这面参考区域',
        type: {
          label: '形状',
          rectangle: '矩形',
        },
        direction: {
          label: '方向',
          horizontal: '水平',
        },
        boundary: {
          upper: '上边界',
          lower: '下边界',
        },
        content: {
          label: '内容',
          content_text: '内容文字',
          text_position: '文字位置',
        },
        endpoint: {
          labels: '端点',
          left_bottom_point: '左下点',
          right_top_point: '右上点',
        },
      },
      zooming: {
        label: '缩放',
        scroll: {
          label: '滚轮缩放',
          x_axis: '对X轴启用',
          y_axis: '对Y轴启用',
        },
        slider: {
          label: '滚动条缩放',
          x_axis: '对X轴启用',
          y_axis: '对Y轴启用',
          y_axis_disabled: '暂不可用，会与Y轴刻度文字重叠',
        },
      },
    },
    viz: {
      viz_config_banner: '可视化参数配置',
    },
    validation: {
      number: {
        require_a_number: '请填写一个数字',
      },
    },
  },
};
