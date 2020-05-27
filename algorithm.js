function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
let correction = 0.000001;

function heuristic(a, b) {
  correction += 0.000001;
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) - correction;
}

function neighbors(node) {
  let neighborsArr = [];
  if (node.x > 0) {
    neighborsArr.push(map[node.x - 1][node.y]);
  }
  if (node.x < map.length - 1) {
    neighborsArr.push(map[node.x + 1][node.y]);
  }
  if (node.y > 0) {
    neighborsArr.push(map[node.x][node.y - 1]);
  }
  if (node.y < map.length - 1) {
    neighborsArr.push(map[node.x][node.y + 1]);
  }
  return neighborsArr;
}

function AStarSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  let count = 0;
  while (!frontier.isEmpty() && count < 900) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      correction = 0.000001;
      while (!frontier.isEmpty()) {
        frontier.pop().type = 'enqueued';
      }
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return current.cost_so_far;
    }

    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        new_cost = current.cost_so_far + next.moveCost;
        if (next.cost_so_far === null || new_cost < next.cost_so_far) {
          next.cost_so_far = new_cost;
          next.priority = new_cost + heuristic(goal, next);
          frontier.push(next);
          next.came_from = current;
        }
      }
    });
    current.type = 'visited';
  }
  return -1;
}

function dijkstraSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  let count = 0;
  while (!frontier.isEmpty() && count < 900) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      while (!frontier.isEmpty()) {
        frontier.pop().type = 'enqueued';
      }
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return current.cost_so_far;
    }

    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        new_cost = current.cost_so_far + next.moveCost;
        if (next.cost_so_far === null || new_cost < next.cost_so_far) {
          next.cost_so_far = new_cost;
          next.priority = new_cost;
          frontier.push(next);
          next.came_from = current;
        }
      }
    });
    current.type = 'visited';
  }
  return -1;
}

function heuristicSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  let count = 0;
  while (!frontier.isEmpty() && count < 900) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      correction = 0.000001;
      while (!frontier.isEmpty()) {
        frontier.pop().type = 'enqueued';
      }
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return current.cost_so_far;
    }

    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        next.cost_so_far = current.cost_so_far + next.moveCost;
        next.priority = heuristic(goal, next);
        frontier.push(next);
        next.came_from = current;

      }
    });
    current.type = 'visited';
  }
  return -1;
}
