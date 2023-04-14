import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import { style } from './style';

interface TagData {
  value: string;
  isRemovable: boolean;
}

interface TagController {
  tags: TagData[];
  setTags: Dispatch<SetStateAction<TagData[]>>;
}

interface TagInputBarProps {
  width: number;
  height: number;
  maxCount?: number;
  tagController: TagController;
}

export function useTagController(init?: TagData[]): TagController {
  const [tags, setTags] = useState<TagData[]>(init ?? []);

  return { tags: tags, setTags: setTags };
}

export default function TagInputBar({ width, height, maxCount, tagController }: TagInputBarProps) {
  const { theme } = useGlobalTheme();
  const [text, setText] = useState<string>('');

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };
  const handleButtonClick = (targetIdx: number) => {
    tagController.setTags((tags) => {
      return [...tags.filter((_, idx) => idx !== targetIdx)];
    });
  };
  const handleNewTag = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      if (tagController.tags.length === maxCount) return;
      const newTag: TagData = {
        value: text,
        isRemovable: true,
      };
      tagController.setTags([...tagController.tags, newTag]);
      setText('');
    } else if (ev.key === 'Backspace' && text.length === 0) {
      tagController.setTags((tags) => [
        ...tags.filter((tag, idx, arr) => idx !== arr.length - 1 || !tag.isRemovable),
      ]);
    }
  };

  return (
    <div css={style.container(width, height, theme.gray)}>
      {tagController.tags.map((tag, idx) => (
        <span key={idx} css={style.tag(theme.blueWhite)}>
          {tag.value}
          <button
            onClick={() => {
              handleButtonClick(idx);
            }}
          >
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        css={style.input(height)}
        onKeyDown={handleNewTag}
      />
    </div>
  );
}
