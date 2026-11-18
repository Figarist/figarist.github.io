# frozen_string_literal: true

# Kramdown renders Markdown task lists as disabled <input type="checkbox">
# elements without an accessible name. Replace them with a decorative glyph so
# checklist items read as plain list items for assistive technology.
TASK_CHECKBOX = %r{<input\b[^>]*\bclass="task-list-item-checkbox"[^>]*>}

Jekyll::Hooks.register %i[documents pages], :post_render do |doc|
  next unless doc.output.is_a?(String) && doc.output.include?('task-list-item-checkbox')

  doc.output = doc.output.gsub(TASK_CHECKBOX) do |tag|
    checked = tag.match?(/\schecked\b/)
    glyph = checked ? "☑" : "☐"
    %(<span class="task-list-item-box" aria-hidden="true">#{glyph}</span>)
  end
end
