interface EditableSpanProps {
  value: string;
  onEdit: (value: string) => void;
  isEditing: boolean;
  editValue: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditEnd: () => void;
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const EditableSpan: React.FC<EditableSpanProps> = ({ value, onEdit, isEditing, editValue, onEditChange, onEditEnd, onEditKeyDown }) => {
  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={onEditChange}
        onBlur={onEditEnd}
        onKeyDown={onEditKeyDown}
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={() => onEdit(value)}
      style={{
        cursor: 'pointer',
        padding: '2px 4px',
        borderRadius: '4px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {value}
    </span>
  );
};
export default EditableSpan;
