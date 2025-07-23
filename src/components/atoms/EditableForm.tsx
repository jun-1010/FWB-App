import React from 'react';

interface EditableFormProps {
  value: string;
  onSave: (value: string) => void;
  isAmount?: boolean;
  tabIndex?: number;
}

const EditableForm: React.FC<EditableFormProps> = ({ value, onSave, isAmount = false, tabIndex }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  // 編集開始
  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  // 編集値の変更
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // 編集終了（保存）
  const handleEditEnd = () => {
    setIsEditing(false);
    onSave(editValue);
  };

  // 編集キャンセル
  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  // Enterキーで保存、Escapeキーでキャンセル
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !(e.nativeEvent as any).isComposing) {
      handleEditEnd();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // valueが変更されたらeditValueも更新
  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  if (isEditing) {
    return (
      <input
        className={isAmount ? `balance-sheet__cell editable-form balance-sheet__cell--amount` : `balance-sheet__cell editable-form`}
        type="text"
        value={editValue}
        onChange={handleEditChange}
        onBlur={handleEditEnd}
        onKeyDown={handleEditKeyDown}
        onFocus={e => e.target.select()}
        autoFocus
        tabIndex={tabIndex}
      />
    );
  }

  return (
    <span
      className={isAmount ? `balance-sheet__cell editable-form balance-sheet__cell--amount` : `balance-sheet__cell editable-form`}
      onClick={handleEditStart}
      tabIndex={tabIndex}
    >
      {value}
    </span>
  );
};

export default EditableForm;
