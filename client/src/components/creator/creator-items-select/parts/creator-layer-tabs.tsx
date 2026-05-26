interface Tab {
  key: string;
  label: string;
}

interface CreatorLayerTabsProps {
  tabs: Tab[];
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
}

export function CreatorLayerTabs({
  tabs,
  selectedLayer,
  setSelectedLayer,
}: CreatorLayerTabsProps) {
  return (
    <div className="mb-4">
      <div
        className="custom-scrollbar flex gap-2 overflow-x-auto pb-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSelectedLayer(tab.key);
            }}
            className={`rounded-lg px-5 py-2 text-center font-mono text-base font-bold tracking-wide whitespace-nowrap transition-colors ${
              selectedLayer === tab.key
                ? "border border-amber-300 bg-transparent text-amber-300"
                : "border border-transparent bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
