interface Props {
  figma: string;
  title: string;
  owner: 'FE A' | 'FE B';
  todos?: string[];
}

/** 아직 구현 전인 페이지 자리표시. 화면 작업 시작하면 지우고 실제 UI로 교체하세요. */
export function PagePlaceholder({ figma, title, owner, todos = [] }: Props) {
  return (
    <section className="rounded-xl border border-dashed border-gray-300 bg-white p-8">
      <p className="text-xs text-gray-400">
        Figma {figma} · 담당 {owner}
      </p>
      <h1 className="mt-1 text-2xl font-bold">{title}</h1>
      {todos.length > 0 && (
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-gray-600">
          {todos.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
