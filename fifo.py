from collections import deque

def fifo_algorithm(page_sequence, num_frames):
    frames = deque(maxlen=num_frames)
    page_faults = 0

    for page in page_sequence:
        if page not in frames:
            page_faults += 1
            if len(frames) == num_frames:
                frames.popleft()
            frames.append(page)

    return page_faults

def optimal_algorithm(page_sequence, num_frames):
    frames = []
    page_faults = 0

    for page in page_sequence:
        if page not in frames:
            page_faults += 1
            if len(frames) == num_frames:
                future_pages = page_sequence[page_sequence.index(page)+1:]
                if len(future_pages) >= num_frames:
                    frames = [future_pages[i] for i in range(num_frames)]
                else:
                    frames.append(page)

    return page_faults
