---
title: "Composable Agents and Tooling"
date: "2025-10-09"
excerpt: "Exploring agent architectures, tools, and patterns for robust LLM systems."
tags: [agents, llm, systems]
---

Agents coordinate tools and reasoning. A simplified pseudo-code:

```python
class Agent:
    def __init__(self, tools):
        self.tools = tools
    def run(self, task):
        plan = self.plan(task)
        for step in plan:
            tool = self.select_tool(step)
            result = tool.execute(step)
        return self.summarize()
```

Key equation for expected utility $\mathbb{E}[U]$:

$$
\mathbb{E}[U] = \sum_i p_i \cdot u_i
$$

Tool choice matters; observability and retries are essential.

