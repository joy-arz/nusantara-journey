# Pre-Production Planning Document
  ## Indonesian Folklore Terminal RPG

  **Project Repository:** https://github.com/joy-arz/indonesian-folklore-terminal-rpg  
  **Current Version:** 2.1.3  
  **Planning Date:** March 08, 2026  
  **Status:** Pre-Production Analysis

  ---

  ## Executive Summary

  This document analyzes the existing Indonesian Folklore Terminal RPG codebase and outlines a comprehensive plan to resolve critical issues before moving to production. The project is an educational terminal-based RPG that teaches players about Indonesian history (10 kingdoms, 7th-17th century), mythology (22+ creatures), and culture through AI-powered interactive storytelling.

  **Target Audience:** International players (ages 13+)  
  **Platform:** Terminal/CLI (Windows, macOS, Linux)  
  **Tech Stack:** Python 3.8+, Cerebras AI API (Llama 3.1-8B), OpenAI SDK

  ---

  ## 1. Codebase Architecture Analysis

  ### 1.1 Project Structure

  ```
  trpg/
  ├── __init__.py          # Package initialization (v2.1.3)
  ├── ai_engine.py         # AI prompt management, API calls, context tracking
  ├── combat.py            # Enemy templates, combat logic, turn-based system
  ├── game.py              # Main game loop (1046 lines - MONOLITHIC)
  ├── player.py            # Player stats, inventory, equipment, items
  ├── save_system.py       # Save/load game state management
  ├── shop.py              # Shopping system, item purchases
  ├── story.py             # Story progression, turn tracking, encounter triggers
  ├── ui.py                # Terminal UI rendering, colors, input handling
  └── updater.py           # Auto-update system
  ```

  ### 1.2 Core Systems Overview

  #### Game Loop (game.py)
  - **Main Class:** `Game` (single monolithic class)
  - **State Management:** Boolean flags (`in_combat`, `in_shop`, `game_over`, `game_ended`)
  - **Turn Management:** Auto-save every 5 turns, chapter progression every 100 turns
  - **Flow:** Initialize → Load/New Game → Exploration → Combat/Shop → Save → Repeat

  **Issues Identified:**
  - ❌ Monolithic design (1046 lines in single class)
  - ❌ No state machine (boolean flags allow invalid states)
  - ❌ Tight coupling between systems

  ---

  ## 2. Critical Issues & Proposed Solutions

  ### Issue #1: Enemy Consistency (CRITICAL ❌)

  **Problem:** Three different enemies appear in one encounter:
  - AI Story: "A massive Naga emerges..."
  - Display Name: "ENEMY: Kuntilanak"
  - Combat Enemy: Random (Tuyul)

  **Recommended Solution:** Option C - Pass Enemy to AI

  The game should create the enemy first, then tell the AI to describe that specific enemy.

  ---

  ### Issue #2: Equipment System (CRITICAL ❌)

  **Problem:** Players cannot equip items from inventory

  **Root Cause:** Item name/category mismatch in initialization

  **Recommended Solution:** 
  - Case-insensitive item name matching
  - Debug logging to identify exact failure point
  - Verify starting items match ITEM_DATABASE entries

  ---

  ### Issue #3: Story Teleportation (HIGH 🟡)

  **Problem:** AI teleports player between unrelated locations

  **Recommended Solution:** Location state tracking system
  - Track current location (indoor/outdoor/water)
  - Add location context to AI prompts
  - Validate scene consistency post-generation

  ---

  ### Issue #4: Post-Combat Story Reset (HIGH 🟡)

  **Problem:** Story sometimes resets after combat ends

  **Recommended Solution:** 
  - Verify story_history persistence through combat
  - Ensure last_scene_context updates after combat
  - Test combat → exploration flow extensively

  ---

  ### Issue #5: AI Format Leaking (MEDIUM 🟢)

  **Problem:** AI includes "NARRATIVE SECTION:" headers in output

  **Recommended Solution:** Post-processing cleanup
  - Regex patterns to strip section headers
  - Parse and validate AI output structure
  - Fallback to default choices if parsing fails

  ---

  ### Issue #6: Choice Quality (MEDIUM 🟢)

  **Problem:** AI generates long, multi-action choices

  **Recommended Solution:** Choice validation and shortening
  - Word count validation (10-25 words)
  - Multi-action detection
  - Automatic trimming if too long

  ---

  ## 3. System Architecture Improvements

  ### 3.1 State Machine Implementation (PRIORITY 2)

  Replace boolean flags with proper state enum:

  ```python
  class GameState(Enum):
      EXPLORATION = "exploration"
      COMBAT = "combat"
      SHOP = "shop"
      EQUIPMENT = "equipment"
      GAME_OVER = "game_over"
  ```

  **Benefits:**
  - ✅ Prevents invalid states
  - ✅ Clear state transitions
  - ✅ Easier debugging
  - ✅ Better save/load handling

  ---

  ### 3.2 Context Management Optimization

  Current: 50-scene rolling history (token-heavy)

  **Recommended Approach:** Summary + Recent
  - Summarize every 10 scenes
  - Keep last 5 scenes full
  - Track key events separately (NPC meetings, items, major choices)

  **Benefits:**
  - ⬇️ Lower token usage
  - ✅ Maintains important context
  - ⚡ Faster API responses

  ---

  ## 4. Implementation Roadmap

  ### Phase 1: Critical Fixes (Week 1)
  **Days 1-2:** Enemy Consistency Fix
  - Implement "pass enemy to AI" approach
  - Test with all enemy types
  - Verify descriptions match

  **Days 3-4:** Equipment System Fix
  - Add debug logging
  - Fix item name matching
  - Test equip/unequip flow

  **Days 5-7:** State Machine
  - Replace boolean flags
  - Implement state transitions
  - Update all state checks

  ---

  ### Phase 2: Story Quality (Week 2)
  **Days 1-2:** Location Tracking
  - Implement location state system
  - Add to AI prompts
  - Test teleportation prevention

  **Days 3-4:** Post-Combat Story
  - Verify history persistence
  - Test combat flow
  - Fix context loss

  **Days 5-7:** AI Output Processing
  - Implement cleaning functions
  - Add choice validation
  - Test with various outputs

  ---

  ### Phase 3: Testing & Polish (Week 3)
  **Days 1-3:** Comprehensive Testing
  - All critical path scenarios
  - Regression testing
  - Performance profiling

  **Days 4-5:** Documentation
  - Update README
  - Deployment guide
  - Troubleshooting FAQ

  **Days 6-7:** Production Deploy
  - Final cross-platform testing
  - Tag v2.2.0 release
  - Deploy

  ---

  ## 5. Testing Strategy

  ### Critical Path Tests

  1. **Enemy Consistency Test**
     - Start game, trigger combat
     - Verify AI description = Display name = Combat enemy
     - Repeat with 5+ enemy types

  2. **Equipment System Test**
     - Equip/unequip all starting items
     - Verify stats update correctly
     - Test with all equipment categories

  3. **Story Continuity Test**
     - Play 10 turns, track locations
     - Verify no illogical teleportation
     - Test combat → exploration transition

  4. **State Machine Test**
     - Test all valid transitions
     - Verify invalid transitions blocked
     - Test state persistence in saves

  ---

  ## 6. Success Criteria

  ### Must Have (Launch Blockers)
  - ✅ Enemy consistency: 100% match rate
  - ✅ Equipment system: Fully functional
  - ✅ State machine: No invalid states
  - ✅ Save/load: Works in all states
  - ✅ No critical crashes

  ### Should Have (Quality Targets)
  - ✅ Story teleportation: <10% of turns
  - ✅ Post-combat continuity: >90%
  - ✅ AI format leaking: <5%
  - ✅ Choice quality issues: <20%

  ### Nice to Have (Polish)
  - Auto-equip suggestions
  - Better UI for equipment
  - Performance monitoring
  - Code refactoring

  ---

  ## 7. Risk Assessment

  ### High Risk 🔴
  **Enemy Fix Breaks Combat Balance**
  - Mitigation: Thorough testing with all enemies
  - Fallback: Revert, accept inconsistency

  **Equipment Has Deeper Issues**
  - Mitigation: Debug logging first
  - Fallback: Disable equipment, increase base stats

  ### Medium Risk 🟡
  **AI Still Teleports Despite Tracking**
  - Mitigation: Add validation layer
  - Fallback: Manual correction

  **State Machine Breaks Saves**
  - Mitigation: Extensive save/load testing
  - Fallback: Keep state machine, add compatibility

  ### Low Risk 🟢
  **Output Cleaning Removes Valid Text**
  - Mitigation: Conservative patterns
  - Fallback: Disable cleaning

  ---

  ## 8. Timeline & Milestones

  **Week 1:** Critical Fixes
  - Enemy consistency ✅
  - Equipment system ✅
  - State machine ✅

  **Week 2:** Story Quality
  - Location tracking ✅
  - Combat story fix ✅
  - Output processing ✅

  **Week 3:** Launch Prep
  - Testing ✅
  - Documentation ✅
  - Production deploy ✅

  **Target Launch Date:** March 29, 2026

  ---

  ## 9. Post-Production Roadmap

  ### v2.2.0 (Next Release)
  - Context optimization (summary system)
  - UI improvements
  - More kingdoms (add remaining 4)

  ### v2.3.0 (Future)
  - Multiplayer support
  - Web UI version
  - Mobile app

  ### v3.0.0 (Major Refactor)
  - ECS architecture
  - Full test coverage
  - Plugin system

  ---

  ## 10. Conclusion

  The Indonesian Folklore Terminal RPG has strong educational content and a unique cultural focus. The critical issues (enemy consistency, equipment system) are fixable within the 3-week timeline. Story quality improvements will enhance immersion significantly.

  **Estimated Time to Production:** 3 weeks  
  **Confidence Level:** High (85%)  
  **Recommended Launch:** March 29, 2026  

  The game will provide an engaging way for international audiences to learn about Indonesian history and mythology once these issues are resolved.

  ---

  ## Appendix: Files Requiring Changes

  ### Critical Priority
  1. **game.py** - Enemy fix, state machine
  2. **ai_engine.py** - Location tracking, output processing
  3. **player.py** - Equipment system fix

  ### Medium Priority
  4. **combat.py** - Enemy parameter updates
  5. **save_system.py** - State serialization

  ### Testing Priority
  - All above files
  - story.py (turn tracking)
  - ui.py (display updates)
  - shop.py (state transitions)

  ---

  **Document Version:** 1.0  
  **Last Updated:** March 08, 2026  
  **Status:** Ready for Implementation
  