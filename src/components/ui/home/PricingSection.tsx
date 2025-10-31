import { Check, Crown, Gem, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      duration: "Forever",
      icon: Star,
      features: [
        "Create Profile",
        "Browse Profiles",
        "Send Interest",
        "Basic Search",
        "Email Support",
      ],
      popular: false,
      buttonText: "Get Started",
      buttonClass: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "Premium",
      price: "$19",
      duration: "per month",
      icon: Crown,
      features: [
        "Everything in Basic",
        "Advanced Search",
        "Direct Messaging",
        "Profile Views",
        "Priority Support",
        "Video Calling",
      ],
      popular: true,
      buttonText: "Choose Premium",
      buttonClass:
        "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
    },
    {
      name: "Elite",
      price: "$49",
      duration: "per month",
      icon: Gem,
      features: [
        "Everything in Premium",
        "Personal Matchmaker",
        "Background Verification",
        "Exclusive Events",
        "24/7 Support",
        "Success Guarantee",
      ],
      popular: false,
      buttonText: "Go Elite",
      buttonClass:
        "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
    },
    {
      name: "VIP",
      price: "$99",
      duration: "per month",
      icon: Crown,
      features: [
        "Everything in Elite",
        "Dedicated Consultant",
        "Premium Profile Boost",
        "Private Events",
        "Concierge Service",
        "Guaranteed Matches",
      ],
      popular: false,
      buttonText: "Join VIP",
      buttonClass:
        "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find the plan that suits your needs and start your journey to
            finding true love
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? "border-red-500 bg-white/15"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-white/80">
                  <span className="text-3xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && (
                    <span className="text-sm">/{plan.duration}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/80 text-lg">
            All plans include our satisfaction guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
