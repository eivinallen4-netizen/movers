interface Props {
  heading: string;
  subheading?: string;
  className?: string;
}

export default function SectionHeading({ heading, subheading, className = "" }: Props): React.ReactElement {
  return (
    <div className={className}>
      <h2 className="heading-xl text-center text-2xl sm:text-3xl lg:text-4xl">{heading}</h2>
      {subheading && (
        <p className="text-center text-text-secondary mt-2 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          {subheading}
        </p>
      )}
    </div>
  );
}
