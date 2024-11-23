# NutriPilot.AI 🥗

Your AI-powered diet companion that helps you plan, shop, and track your nutrition journey.

![NutriPilot Logo](https://nutripilot.blob.core.windows.net/logo/NutriPilotLogo.png)

## 🎯 Value Proposition

NutriPilot.AI is your AI-powered companion designed to take the hassle out of diet management. 

By providing personalized meal plans, guiding your shopping, and tracking your calorie and macronutrient intake, NutriPilot.AI simplifies the process, saving you time and energy while helping you stay consistent and confidently achieve your dietary goals. 

When you can’t meet your plan, NutriPilot.AI provides you a easy way to resync unplanned meals, and recalculate your plan.

NutriPilot.AI takes the hassle out of diet management by serving as your intelligent nutrition companion. Our platform provides:

- Personalized meal planning
- Smart shopping guidance
- Precise calorie and macronutrient tracking
- Flexible meal plan adjustments

When life happens and you can't stick to your plan, NutriPilot.AI helps you easily resync unplanned meals and recalculate your nutrition goals.

## 🤔 The Problem

Maintaining a consistent diet aligned with specific health or fitness goals is challenging:
- Meal planning is time-consuming
- Grocery shopping can be overwhelming
- Tracking calories and macros is tedious
- Adjusting plans for unexpected changes is frustrating

These challenges often lead to diminished motivation and reduced chances of achieving fitness and health goals.

## 💡 Our Solution

NutriPilot.AI streamlines your entire diet management process through:

1. **Smart Meal Planning**: AI-generated, personalized meal plans
2. **Automated Shopping**: Dynamic grocery lists based on your meal plan
3. **Effortless Tracking**: Real-time calorie and macronutrient monitoring
4. **Flexible Adjustments**: Easy resyncing of unplanned meals

## 🔄 How It Works

Our current solution follows a simple yet powerful flow:

1. **Personal Assessment**: Chat with our AI nutrition expert to share your:
   - Fitness goals
   - Physical profile
   - Dietary preferences

2. **Smart Dashboard**: Access your personalized nutrition hub featuring:
   - AI-generated weekly meal plans
   - Goal tracking and progress monitoring
   - Automated shopping lists

## 🚀 Quick Start Guide

1. **Access NutriPilot.AI**
   - Visit: [https://purple-coast-03e791f03.5.azurestaticapps.net/dashboard/ykersg](https://purple-coast-03e791f03.5.azurestaticapps.net/dashboard/ykersg)

2. **Complete Initial Assessment**
   - Chat with our nutrition assistant
   - Provide required information about your goals and preferences
   - Pro tip: Use the provided examples in the blue box for testing

3. **Navigate Your Dashboard**
   - Review your personalized calorie and macro goals
   - Manage meals using "confirm" and "remove" actions
   - Track goal updates in real-time

4. **Add Unplanned Meals**
   - Click "Add Meal"
   - Upload images of unplanned meals
   - Let our AI automatically update your plan and your goal tracking

5. **Access Shopping List**
   - Click the shopping list icon in the top right corner
   - View dynamically generated weekly shopping requirements
   - List updates based on unconfirmed meals

{{TBD: Put here a video of our demo}}

## 🗺️ Roadmap

Our vision for NutriPilot.AI extends far beyond its current capabilities. Here's what we're planning:

### 🎯 Smart Goal Adaptation
- **Dynamic Meal Recalculation**: When unplanned meals occur, automatically adjust future meals to keep users on track with their goals
- **Enhanced Personalization**: Adapt meal generation based on:
  - Lifestyle patterns
  - Progress rate preference
  - Cooking expertise
  - Kitchen equipment
  - Time availability
  - Cultural preferences
  - Activity level and exercise routine
  - Motivational factors and personal drivers
  - Food allergies and intolerances
  - Food preferences and dislikes
  - Typical eating-out patterns
  - Weekend flexibility needs


### 👨‍👩‍👧‍👦 Family & Group Support
- Multi-user meal planning
- Shared shopping lists
- Family-friendly recipe suggestions
- Group goal tracking

### 🛒 Shopping Experience Enhancement
- **Retail Integration**: Direct integration with online grocery stores
- **One-Click Shopping**: Convert meal plans to online shopping carts
- **Smart Storage Management**:
  - Ingredient tracking
  - Spoilage prevention
  - Waste reduction
  - Pantry optimization

TBD: Market Opportunity
TBD: 7.  Go-To-Market Strategy — Marcelo
TBD: Buisness Model
TDB: Competitive Landscape (only with myfitnesspalm & key higlights)
TBD: Team (just me and Marcelo)
## 🎯 Go-To-Market Strategy
1. **Initial Phase: B2B2C**
   - Partner with gyms as early adopters
   - Build credibility in the fitness community
   - Gather valuable user feedback
   
2. **Expansion: B2C Market**
   - Leverage established reputation
   - Scale user base
   - Implement continuous improvements based on user interaction
   - Expand marketing channels

## 🏗️ Technical Architecture

### Cloud Arquiteture
We are using azure for the project presented, our solution follows the following guidelines.

<div style="height: 400px; overflow: hidden">
  <img src="./src/utils/nutripil.ai_cloud_architecture.png" style="margin-top: -60px;" alt="NutriPilot Logo">
</div>

### Front-End Project Structure

```
├── app/            # Setup (eg: root element and route)
├── Components/     # UI components with minimal logic
├── Infrastructure/ # External system connections
│   ├── Clients/    # External system clients
│   ├── Cache/      # Caching system configurations
│   └── Models/     # Request/Response models
├── Services/       # Business logic layer
├── Interface/      # Application pages
└── Utils/         # Helper functions and UI theming
```