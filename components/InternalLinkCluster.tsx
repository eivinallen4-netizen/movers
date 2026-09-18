import Link from "next/link";

interface InternalLink {
  href: string;
  title: string;
  blurb: string;
}

interface InternalLinkClusterProps {
  title?: string;
  links: InternalLink[];
}

export default function InternalLinkCluster({
  title = "Related Services",
  links,
}: InternalLinkClusterProps) {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-navy-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <div className="group bg-gradient-to-br from-navy-700/50 to-navy-800/50 hover:from-blue-500/10 hover:to-navy-800 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 h-full cursor-pointer hover:shadow-lg hover:shadow-blue-500/10">
                <h3 className="heading-md text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
                  {link.blurb}
                </p>
                <div className="inline-block text-sm text-blue-400 group-hover:text-blue-300 font-semibold transition-colors">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
