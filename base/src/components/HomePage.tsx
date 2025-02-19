'use client'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BeakerIcon, ShoppingBagIcon, WrenchIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/app/theme";

const cards = [
  {
    title: "Products",
    description:
      "Explore our innovative product lineup designed to meet your needs.",
    icon: ShoppingBagIcon,
    color: "from-blue-500 to-cyan-500",
    path: "/products",
  },
  {
    title: "Research",
    description:
      "Discover our groundbreaking research and scientific contributions.",
    icon: BeakerIcon,
    color: "from-purple-500 to-pink-500",
    path: "/research",
  },
  {
    title: "Services",
    description:
      "Professional services tailored to your business requirements.",
    icon: WrenchIcon,
    color: "from-green-500 to-emerald-500",
    path: "/productServices",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive suite of solutions designed to drive
            innovation and success.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {cards.map((card) => (
            <Link key={card.title} href={`${card.path}`}>
              <motion.div key={card.title} variants={cardVariants}>
                <Card className="group cursor-pointer relative overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${card.color})`,
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br ${card.color}`}
                      >
                        <card.icon className="w-6 h-6 text-white" />
                      </div>

                      <h2 className="text-2xl font-semibold mb-3">
                        {card.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {card.description}
                      </p>

                      <div className="mt-6 flex items-center text-sm font-medium text-primary">
                        Learn more
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}