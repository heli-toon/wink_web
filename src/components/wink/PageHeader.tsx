export const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex flex-wrap items-end justify-between gap-4 px-4 py-6 md:px-8">
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
    {action}
  </div>
);
