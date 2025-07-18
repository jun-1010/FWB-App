import React from 'react';

interface NewFormProps {
  placeholder?: string;
  onAdd: (value: string) => void;
  isAmount?: boolean;
}

const NewForm: React.FC<NewFormProps> = ({ placeholder = '+ 追加', onAdd, isAmount = false }) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleAddStart = () => {
    setIsAdding(true);
  };

  const handleAddEnd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
    setIsAdding(false);
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !(e.nativeEvent as any).isComposing) {
      handleAddEnd();
    } else if (e.key === 'Escape') {
      handleAddCancel();
    }
  };

  if (isAdding) {
    return (
      <input
        className={isAmount ? `editable-form editable-form--amount` : `editable-form`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleAddEnd}
        onFocus={e => e.target.select()}
        autoFocus
      />
    );
  }

  return (
    <span
      className={isAmount ? `editable-form editable-form--amount` : `editable-form`}
      onClick={handleAddStart}
      style={{
        cursor: 'pointer',
        borderRadius: '4px',
        color: '#666',
        fontStyle: 'italic',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {placeholder}
    </span>
  );
};

export default NewForm;
