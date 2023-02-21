---

database-plugin: basic

---

<%%
name: new database
description: new description
columns:
  __file__:
    key: "__file__"
    input: "markdown"
    label: "File"
    accessorKey: "__file__"
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    isHidden: false
    config:
      enable_media_view: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
  Author:
    input: "text"
    key: "Author"
    accessorKey: "Author"
    label: "Author"
    position: 0
    skipPersist: false
    isHidden: false
    config:
      enable_media_view: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
config:
  remove_field_when_delete_column: "false"
  cell_size: "normal"
  sticky_first_column: "false"
  group_folder_column: ""
  show_metadata_created: "false"
  show_metadata_modified: "false"
  show_metadata_tasks: "false"
  source_data: "current_folder"
  source_form_result: "root"
  frontmatter_quote_wrap: "false"
  row_templates_folder: "/"
  current_row_template: ""
filters:
  enabled: false
  conditions:
%%>